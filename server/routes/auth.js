/**
 *      /auth/...
 */

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

  authUser({ body }, { json }) {
    User.authenticate(body.email, body.password, user => {
      if (!user) {
        return json(false);
      }
      session.userData = user;
      json(user);
    });
  }

  authFacebook({ session, body }, { json }) {
    User.handleUserWithFacebook(body, user => {
      if (!user | !user._id) {
        return json({ saved: false });
      }
      session.userData = user;
      json(user);
    });
  }

  registerUser({ session, body }, { json }) {
    User.createNew(body)
      .then(user => {
        if (!user) {
          return json({ saved: false });
        }
        session.userData = user;
        // send user email confirmation
        // helpers.sendEmailConfirmation(user._id, user.email); //   Activate email on production and change sendgrid company url!   ****CHANGE ON PRODUCTION******
        json(user);
      })
      .catch(e => {
        console.log(e);
        // if dublicate user (same email)
        if (e.code == 11000) {
          return json({ dublicate: true });
        }
        json({ saved: false });
      });
  }

  userLogout({ session }) {
    if (session) {
      session.destroy();
    }
  }
}

new AuthRouter(router);

module.exports = router;
