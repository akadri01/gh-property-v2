/**
 *   Admin routes
 *
 *        /admin/...
 */

"use strict";

const express = require("express");
const router = express.Router();
const path = require("path");
const rimraf = require("rimraf");
const logger = require("../../../logger");

class AdminRouter {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
  }

  
}

new AdminRouter(router);

module.exports = router;
