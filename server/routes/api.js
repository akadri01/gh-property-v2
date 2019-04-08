"use strict";

const express = require("express");
const router = express.Router();
const enableCors = require("cors");
const rimraf = require("rimraf");
const _isEmpty = require("lodash.isempty");
const path = require("path");
const User = require("../../db/models/user");
const Property = require("../../db/models/property");
const helpers = require("../helpers");
const dbHelpers = require("../../db/helpers");
const Properties = require("../../db/models/property.js");
const PAGINATION_QUANTITY = require("../../globals/globals.json")
  .PAGINATION_QUANTITY;
const logError = helpers.logError;
const Enquire = require("../../db/models/enquire");

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
    this.router.get("/fetch/properties/:sort", [
      enableCors(),
      this.searchSortPaginate.bind(this)
    ]);
    this.router.get("/fetch/property/:url", [
      enableCors(),
      this.fetchProperty.bind(this)
    ]);
    this.router.post("/enquire", [
      enableCors(),
      this.saveCustomerEnquire.bind(this)
    ]);
    this.router.delete("/user/remove/advert", [
      enableCors(),
      this.userRemoveAdvert.bind(this)
    ]);
    this.router.put("/user/edit/advert", [
      enableCors(),
      this.userEditAdvert.bind(this)
    ]);
  }

  userEditAdvert({ body }, { json }) {
    Property.editContent(body, status => {
      return json({ success: status });
    });
  }

  userRemoveAdvert({ body }, { json }) {
    if (_isEmpty(body)) {
      return json({});
    }
    const { url, userId, imgDirectory } = body;
    // removeAdvert returns updated user
    dbHelpers.removeAdvert(userId, url, user => {
      if (_isEmpty(user)) {
        return json({});
      }
      if (imgDirectory !== "placeholders") {
        const directory = path.join(
          "./static/images/property-uploads/",
          imgDirectory
        );
        rimraf.sync(directory);
      }
      return json(user);
    });
  }

  fetchProperty({ params }, { json }) {
    Property.findOne({ url: params.url })
      .then(property => res.json(property))
      .catch(e => {
        logError(e, "Error: Api > fetchProperty()");
        return json({});
      });
  }

  saveCustomerEnquire({ body }) {
    const enquire = new Enquire({
      name: body.name,
      contact: body.contact,
      text: body.text
    });
    enquire
      .save()
      .catch(e => logError(e, "Error: Api > saveCustomerEnquire()"));
  }

  searchSortPaginate({ params, query }, { json }) {
    const { sort } = params;
    const sortQuery =
      sort === "highest"
        ? { price: -1 }
        : sort === "lowest"
        ? { price: 1 }
        : { date: -1 };
    const searchQueryObj = query;
    const limitQty = PAGINATION_QUANTITY;
    const skipQty = query.page ? parseInt(query.page) * PAGINATION_QUANTITY : 0;
    Property.searchSortWithTotalRecordQty(
      searchQueryObj,
      sortQuery,
      limitQty,
      skipQty,
      (properties, totalRecordQty) =>
        !properties || !totalRecordQty
          ? json({})
          : json([properties, totalRecordQty])
    );
  }

  fetchHomepageRecentProperties(req, { json }) {
    Properties.find()
      .sort({ date: -1 })
      .limit(8)
      .then(properties => {
        return !properties || !properties.length ? json({}) : json(properties);
      })
      .catch(e => {
        logError(e, "Error: API > fetchHomepageRecentProperties");
        return json({});
      });
  }

  async userCreateAdvert({ body, files, session }, { json }) {
    body = JSON.parse(body.inputValues);

    if (files && files.length) {
      body.uniqueDirectory = session.directory
        .replace("./static/images/property-uploads/", "")
        .slice(0, -1);
    } else {
      rimraf.sync(session.directory);
    }

    dbHelpers.createAdUpdateUser(body, session, updatedUser => {
      session.filename = [];
      session.directory = null;
      if (updatedUser.posts_allowed && updatedUser.posts_allowed < 1) {
        rimraf.sync(session.directory);
      }
      return json(updatedUser);
    });
  }

  // To test this route >>>>  http://127.0.0.1:3000/api/user/email-confirmation?id=5c39bf553a07e22b8cdd4a5b
  confirmUserEmail({ query }, { redirect }) {
    User.confirmEmail(query.id, user => {
      if (_isEmpty(user)) {
        return redirect(
          "/user/auth?popup=Email%20confirmation%20failed%2C%20Please%20contact%20us!"
        );
      }
      return redirect(
        "/user/auth?popup=Congragulation%2C%20now%20please%20log%20into%20your%20account."
      );
    });
  }
}

new ApiRouter(router);

module.exports = router;
