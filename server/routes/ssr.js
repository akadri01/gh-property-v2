"use strict";

const routes = require("next-routes");

module.exports = routes()
  .add("index", "/")
  .add("/properties/:id", "_pages/properties")
  .add("/user/auth", "_pages/auth")
  .add("/user/console", "_pages/console")
  .add("/user/advert/edit/:id", "_pages/edit-advert")
  .add("/user/topup", "_pages/topup")
  .add("/property/:id", "_pages/property")
  .add("/user/adverts", "_pages/user-adverts")
  .add("/contact-us", "_pages/contact-us")
  .add("/about-us", "_pages/static/about-us")
  .add("/terms", "_pages/static/terms")
  .add("/faq", "_pages/static/faq")
  .add("/privacy-policy", "_pages/static/privacy-policy");
