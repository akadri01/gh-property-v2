/**
 *  Routes for isomorphic-unfetch & getInitialProps
 *  Base path start as;   /iso/...
 */
"use strict";

const express = require("express");
const router = express.Router();
const enableCors = require("cors");
const helpers = require("../helpers");
const logger = require("../helpers/logger");
// const Properties = require('../../db/models/property.js');

class IsomorphicRouter {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {}
}

new IsomorphicRouter(router);

module.exports = router;
