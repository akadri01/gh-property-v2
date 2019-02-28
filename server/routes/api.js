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
const logger = require("../../logger");

class ApiRouter {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
  
  }

  
}

new ApiRouter(router);

module.exports = router;
