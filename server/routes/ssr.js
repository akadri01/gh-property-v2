"use strict";

module.exports = (router, app) => {
  router.get("/", (req, res) => {
    return app.render(req, res, "/index");
  })
  router.get("/user/auth", (req, res) => {
    return app.render(req, res, "/_pages/auth");
  })
  router.get("/user/console", (req, res) => {
    return app.render(req, res, "/_pages/console");
  })
  router.all("*", (req, res) => {
    return app.getRequestHandler()(req, res);
  });
};

