const routes = require("next-routes");

module.exports = routes()
  .add("index", "/")
  .add("/properties/:id", "/properties")
  .add("/user/auth", "/auth")
  .add("/user/console", "/console")
  .add("/user/advert/edit/:id", "/edit-advert")
  .add("/user/topup", "/topup")
  .add("/property/:id", "/property")
  .add("/user/adverts", "/user-adverts")
  .add("/contact-us", "/contact-us")
  .add("/about-us", "/about-us")
  .add("/terms", "/terms")
  .add("/faq", "/faq")
  .add("/privacy-policy", "/privacy-policy");
