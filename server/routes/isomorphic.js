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
const Property = require("../../db/models/property.js");

class IsomorphicRouter {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/fetch/main/properties", [
      enableCors(),
      this.fetchHomePageInititalProperties.bind(this)
    ]);
    this.router.get("/fetch/property/:url", [
      enableCors(),
      this.fetchProperty.bind(this)
    ]);
  }

  fetchProperty(req, res) {
    Property.findOne({ url: req.params.url })
      .then(property => {
        res.json(property);
      })
      .catch(e => {
        console.log(e);
        logger.log("Error: Iso > fetchProperty() ", e);
        res.json({});
      });
  }

  fetchHomePageInititalProperties(req, res) {
    const sortQuery = { date: -1 };
    const searchQueryObj = req.query;
    const limitQty = 10; // ******** change 25 on production
    Property.searchSortWithTotalRecordQty(
      searchQueryObj,
      sortQuery,
      limitQty,
      (properties, totalRecordQty) => {
        if (!properties || !totalRecordQty) {
          return res.json({});
        }
        return res.json([properties, totalRecordQty]);
      }
    );
  }
}

new IsomorphicRouter(router);

module.exports = router;
