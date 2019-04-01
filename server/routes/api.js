"use strict";

const express = require("express");
const router = express.Router();
const enableCors = require("cors");
const rimraf = require("rimraf");
const User = require("../../db/models/user");
const Property = require("../../db/models/property");
const helpers = require("../helpers");
const dbHelpers = require("../../db/helpers");
const Properties = require("../../db/models/property.js");
const PAGINATION_QUANTITY = require("../../globals/globals.json")
  .PAGINATION_QUANTITY;
const logError = helpers.logError;

class ApiRouter {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/user/email-confirmation", [
      enableCors(),
      this.confirmUserEmail.bind(this)
    ]);
    this.router.post("/user/create/advert", [
      enableCors(),
      helpers.createImageDirectory.bind(this),
      helpers.handleImages().any(),
      helpers.cropImagesMiddleware.bind(this),
      this.userCreateAdvert.bind(this)
    ]);
    this.router.get("/fetch/homepage/properties/recent", [
      enableCors(),
      this.fetchHomepageRecentProperties.bind(this)
    ]);
    this.router.get("/fetch/properties", [
      enableCors(),
      this.searchSortPaginate.bind(this)
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
        logError(e, "Error: Api > fetchProperty()");
        return res.json({});
      });
  }

  searchSortPaginate(req, res) {
    const sortParam = req.query.sort;
    // default sort is by date
    const sortQuery =
      sortParam === "highest"
        ? { price: -1 }
        : sortParam === "lowest"
        ? { price: 1 }
        : { date: -1 };

    const searchQueryObj = req.query;
    const limitQty = PAGINATION_QUANTITY;
    const skipQty = req.query.page
      ? parseInt(req.query.page) * PAGINATION_QUANTITY
      : 0;

    Property.searchSortWithTotalRecordQty(
      searchQueryObj,
      sortQuery,
      limitQty,
      skipQty,
      (properties, totalRecordQty) => {
        if (!properties || !totalRecordQty) {
          return res.json({});
        }
        return res.json([properties, totalRecordQty]);
      }
    );
  }

  fetchHomepageRecentProperties(req, res) {
    Properties.find()
      .sort({ date: -1 })
      .limit(8)
      .then(properties => {
        return !properties || !properties.length
          ? res.json({})
          : res.json(properties);
      })
      .catch(e => {
        logError(e, "Error: API > fetchHomepageRecentProperties");
        return res.json({});
      });
  }

  async userCreateAdvert(req, res) {
    const body = JSON.parse(req.body.inputValues);

    if (req.files && req.files.length) {
      body.uniqueDirectory = req.session.directory
        .replace("./static/images/property-uploads/", "")
        .slice(0, -1);
    } else {
      rimraf.sync(req.session.directory);
    }

    dbHelpers.createAdUpdateUser(body, req.session, updatedUser => {
      req.session.filename = [];
      req.session.directory = null;
      // remove images if user doesn't have credit
      if (updatedUser.posts_allowed && updatedUser.posts_allowed < 1) {
        rimraf.sync(req.session.directory);
      }
      return res.json(updatedUser);
    });
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
