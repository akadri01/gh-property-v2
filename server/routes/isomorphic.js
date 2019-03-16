/**
 *  Only handles isomorphic-unfetch initial props
 *
 *      /iso/...
 */

"use strict";

const express = require("express");
const router = express.Router();
const enableCors = require("cors");
const helpers = require("../helpers");
const logger = require('../helpers/logger');


class IsomorphicRouter {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    
  }

}

new IsomorphicRouter(router);

module.exports = router;
