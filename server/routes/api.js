/**
 *      /api/...
 */

"use strict";

const express = require("express");
const router = express.Router();
const sudoFs = require("sudo-fs-promise");
const enableCors = require("cors");
const path = require("path");
const multer = require("multer");
const rimraf = require("rimraf");
const randomString = require("randomstring");
const crypto = require("crypto");
const User = require("../../db/models/user");
const Property = require("../../db/models/property");
const helpers = require("../helpers");
const logger = helpers.logger;

class ApiRouter {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/user/email-confirmation", [ enableCors(), this.confirmUserEmail.bind(this)]);
    this.router.post("/user/create/advert", [
      enableCors(),
      helpers.createImageDirectory.bind(this),
      helpers.handleImages().any(),
      helpers.cropImagesMiddleware.bind(this),
      this.userCreateAdvert.bind(this)
    ]);
  }

  userCreateAdvert(req, res) {
    const body = JSON.parse(req.body.inputValues);
    // if any files uploaded
    if (req.files && req.files.length) {
      body.uniqueDirectory = req.session.directory
        .replace("./static/images/property-uploads/", "")
        .slice(0, -1);
    } else {
      try {
        rimraf.sync(req.session.directory);
      } catch (e) {
        console.log(e);
        logger.log(
          "Error: rimraf can NOT remove images directory! userCreateAdvert()",
          e
        );
      }
    }
    // check if user has enough credit
    User.findById(body.userId).then(user => {
      if (user.posts_allowed < 1) {
        return res.json(user);
      }
      allowedToPost();
    });

    function allowedToPost() {
      Property.createNew(body, req.session)
        .then(property => {
          // clear up sessions
          req.session.filename = [];
          req.session.directory = null;
          
          // // update user posts
          const thumbnailImgPath = property.img_directory + "/" + property.images[0];
          User.updatePropertyAdverts(
            property.user_id,
            property.url,
            property.title,
            thumbnailImgPath,
            (e, user) => {
              return e || !user ? res.json({ user: false }) : res.json(user);
            }
          );
        })
        .catch(e => {
          console.log(e);
          logger.log(
            "Error: can NOT save new cart advert! userCreateAdvert()",
            e
          );
          return res.json({ user: false });
        });
    }
  }

  // To test this route >>>>  http://127.0.0.1:3000/api/user/email-confirmation?id=5c39bf553a07e22b8cdd4a5b
  confirmUserEmail(req, res) {
    User.confirmEmail(req.query.id, user => {
      if (!user || user === null) {
        // user email confirm internal error
        return res.redirect(
          "/user/auth?popup=Email%20confirmation%20failed%2C%20Please%20contact%20us!"
        );
      }
      // user email confirmed and redirected to user login
      return res.redirect(
        "/user/auth?popup=Congragulation%2C%20now%20please%20log%20into%20your%20account."
      );
    });
  }
  
}

new ApiRouter(router);

module.exports = router;
