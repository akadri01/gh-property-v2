"use strict";

class NextRoutes {
  constructor(server, app, handle) {
    this.server = server;
    this.app = app;
    this.handle = handle;
    this.registerRoutes();
  }

  registerRoutes() {
    this.server.get("/", this.renderHome.bind(this));
    this.server.get("/user/auth", this.renderAuth.bind(this));
    this.server.all("*", this.handleAll.bind(this));
  }

  renderHome(req, res) {
    return this.app.render(req, res, "/index");
  }

  renderAuth(req, res) {
    return this.app.render(req, res, "/user/auth");
  }

  handleAll(req, res) {
    return this.handle(req, res);
  }
}

module.exports = (server, app, handle) => {
  new NextRoutes(server, app, handle);
};
