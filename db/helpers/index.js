"use strict";

const User = require("../models/user");
const logger = require("../../server/helpers/logger");
const Property = require("../models/property");

const databaseHelpers = {
  createAdUpdateUser: async (body, session, cb) => {
    try {
      // verify user credit
      const user = await User.findById(body.userId);
      if (user.posts_allowed < 1) {
        return cb(user);
      }
      // create new add
      const property = await Property.createNew(body, session);
      // update user
      const thumbnailPath = property.img_directory + "/" + property.images[0];
      User.updatePropertyAdverts(
        property.user_id,
        property.url,
        property.title,
        thumbnailPath,
        (e, user) => {
          if (e || !user) {
            return cb({});
          }
          return cb(user);
        }
      );
    } catch (e) {
      console.log(e);
      logger.log(
        "Error: can NOT save new advert! dbHelpers =>> createAdUpdateUser()",
        e
      );
      return cb({});
    }
  }
};

module.exports = databaseHelpers;
