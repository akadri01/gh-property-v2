"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const schema = mongoose.Schema;
const logger = require('../../server/helpers/index.js').logger;

const userSchema = new schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: String,
  posts: Array, // {id, url, title}
  posts_allowed: {
    // can post one free advert each month
    type: Number,
    default: 1
  },
  email_confirmed: {
    type: Boolean,
    default: false
  },
  facebook_confirmed: {
    type: Boolean,
    default: false
  },
  joined_date: {
    type: Date,
    default: Date.now
  }
});

/**
 *  Auth
 */
userSchema.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(3));
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(3));
};

userSchema.methods.comparePassword = function(password, hash) {
  return bcrypt.compareSync(password, hash);
};

userSchema.statics.authenticate = function(email, password, cb) {
  this.findOne({ email: email }, function(e, user) {
    if (e || !user) {
      return cb(null);
    }
    const valid = user.comparePassword(password, user.password);
    if (valid) {
      return cb(user);
    }
    return cb(null);
  });
};

/**
 *  Create User
 */
userSchema.statics.createNew = function({ name, email, password }) {
  const newUser = new User({
    name: name,
    email: email
  });
  newUser.password = newUser.hashPassword(password);
  return newUser.save();
};

/**
 *  Facebook Create or Login User
 */
userSchema.statics.handleUserWithFacebook = function(reqBody, cb) {
  // check if user exists
  this.authenticate(reqBody.email, reqBody.fbUserId, user => {
    if (user) {
      return cb(user);
    } else {
      // register new user
      const newUser = new User({
        name: reqBody.name,
        email: reqBody.email,
        facebook_confirmed: true
      });
      newUser.password = newUser.hashPassword(reqBody.fbUserId);
      newUser
        .save()
        .then(user => {
          return cb(user);
        })
        .catch(e => {
          return cb(e);
        });
    }
  });
};

/**
 *  Confirm Email
 */
userSchema.statics.confirmEmail = function(userId, cb) {
  this.findByIdAndUpdate(
    userId,
    { email_confirmed: true },
    { new: true },
    function(e, user) {
      if (e || !user) {
        console.log(e);
        return cb(null);
      }
      return cb(user);
    }
  );
};

// Save and update car adverts
userSchema.statics.updateCarAdverts = function(
  id,
  url,
  title,
  thumbnailImgPath,
  cb
) {
  this.findById(id, function(e, user) {
    if (e || !user) {
      return cb(e, null);
    }
    // add new car advert to recently posted records
    user.posts.unshift([url, title, thumbnailImgPath]);
    user.posts_allowed = user.posts_allowed - 1;
    user
      .save()
      .then(updatedUser => {
        return cb(false, updatedUser);
      })
      .catch(e => {
        console.log(e);
        logger.log(
          "Error: can NOT save new cart advert! updateCarAdverts()",
          e
        );
        return cb(e, false);
      });
  });
};

const User = mongoose.model("user", userSchema);

module.exports = User;
