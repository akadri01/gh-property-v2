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
const helpers = require("../helpers");
const logger = helpers.logger;

class ApiRouter {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/user/email-confirmation", [ enableCors(), this.confirmUserEmail.bind(this)]);
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
