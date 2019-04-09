"use strict";

const express = require("express");
const router = express.Router();
const User = require("../../db/models/user");

class AuthRouter {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post("/user/facebook", this.authFacebook.bind(this));
    this.router.post("/user/register", this.registerUser.bind(this));
    this.router.post("/user/login", this.authUser.bind(this));
    this.router.get("/user/logout", this.userLogout.bind(this));
  }

  authUser(req, res) {
    User.authenticate(req.body.email, req.body.password, user => {
      if (!user) {
        return res.json(false);
      }
      req.session.userData = user;
      res.json(user);
    });
  }

  authFacebook(req, res) {
    User.handleUserWithFacebook(req.body, user => {
      if (!user | !user._id) {
        return res.json({ saved: false });
      }
      req.session.userData = user;
      res.json(user);
    });
  }

  registerUser(req, res) {
    User.createNew(req.body)
      .then(user => {
        if (!user) {
          return res.json({ saved: false });
        }
        req.session.userData = user;
        // send user email confirmation
        // helpers.sendEmailConfirmation(user._id, user.email); //   Activate email on production and change sendgrid company url!   ****CHANGE ON PRODUCTION******
        res.json(user);
      })
      .catch(e => {
        console.log(e);
        // if dublicate user (same email)
        if (e.code == 11000) {
          return res.json({ dublicate: true });
        }
        res.json({ saved: false });
      });
  }

  userLogout(req) {
    if (req.session) {
      req.session.destroy();
    }
  }
}

new AuthRouter(router);

module.exports = router;
