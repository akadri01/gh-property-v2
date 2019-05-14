"use strict";

const User = require("./models/user");
const Property = require("./models/property");
const logError = require("../server/helpers/index.js").logError;

const databaseHelpers = {
  createAdUpdateUser: async (body, session, cb) => {
    try {
      const user = await User.findById(body.userId);
      if (user.posts_allowed < 1) {
        return cb(user);
      }
      const {
        img_directory,
        images,
        user_id,
        url,
        title
      } = await Property.createNew(body, session);
      const thumbnailPath = img_directory + "/" + images[0];
      User.updatePropertyAdverts(
        user_id,
        url,
        title,
        thumbnailPath,
        (e, user) => e || !user ? cb({}) : cb(user));
    } catch (e) {
      logError(e, "Error: > createAdUpdateUser()");
      return cb({});
    }
  },

  removeAdvert: (userId, propertyUrl, cb) => {
    Property.findOneAndRemove({ url: propertyUrl }).catch(e => {
      logError(e, "Error > removeAdvert() findOneAndRemove()");
      return cb(false);
    });
    User.findById(userId)
      .then(user => {
        user.posts = user.posts.filter(({ url }) => url !== propertyUrl);
        user.save();
        return cb(user);
      })
      .catch(e => {
        logError(e, "Error > removeAdvert() findById()");
        return cb(false);
      });
  }
};

module.exports = databaseHelpers;
