"use strict";

const routes = require("next-routes");

module.exports = routes()
  .add("index", "/")
  .add("/properties", "_pages/properties")
  .add("/user/auth", "_pages/auth")
  .add("/user/console", "_pages/console")
  .add("/user/topup", "_pages/topup")
  .add("/property/:id", "_pages/property");
