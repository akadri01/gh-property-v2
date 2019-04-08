/**
 *   Admin routes
 *
 *        /admin/...
 */

"use strict";

const express = require("express");
const router = express.Router();
const path = require("path");
const rimraf = require("rimraf");
const logError = require("../helpers").logError;
const Property = require("../../db/models/property");
const AdminUser = require("../../db/models/admin.js");
const Users = require("../../db/models/user.js");
const Enquires = require("../../db/models/enquire.js");

class AdminRouter {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    // admin
    this.router.get("/login", this.renderLoginPage.bind(this));
    this.router.post("/login", this.auth.bind(this));
    this.router.get("/logout", this.logout);
    this.router.get("/console", [this.requiresLogin, this.renderConsole]);
    this.router.get("/payments", [this.requiresLogin, this.renderPayments]);

    // enquires
    this.router.get("/enquires", [this.requiresLogin, this.renderEnquires]);
    this.router.get("/enquires/enquire/:id", [
      this.requiresLogin,
      this.renderSingleEnquire
    ]);
    this.router.post("/enquire/remove", [
      this.requiresLogin,
      this.removeEnquire
    ]);

    // customers
    this.router.get("/users", [this.requiresLogin, this.renderUsers]);
    this.router.get("/users/user/:id", [
      this.requiresLogin,
      this.renderSingleUser
    ]);
    this.router.post("/user/find", [this.requiresLogin, this.findUser]);
    this.router.post("/user/edit", [this.requiresLogin, this.editUser]);
    this.router.post("/user/remove", [this.requiresLogin, this.removeUser]);

    // adverts
    this.router.get("/adverts", [this.requiresLogin, this.renderAdverts]);
    this.router.post("/advert/find", [this.requiresLogin, this.findAdvert]);
    this.router.get("/adverts/advert/:id", [
      this.requiresLogin,
      this.renderSingleAdvert
    ]);
    this.router.get("/adverts/advert-by-url/:url", [
      this.requiresLogin,
      this.renderSingleAdvertByUrl
    ]);
    this.router.post("/advert/edit", [this.requiresLogin, this.editAdvert]);
    this.router.post("/advert/remove", [this.requiresLogin, this.removeAdvert]);
  }

  renderConsole(req, res) {
    return res.render("admin-console.pug");
  }

  renderPayments(req, res) {
    res.render("admin-payments.pug");
  }

  renderEnquires(req, res) {
    let skipQty = req.session.enquireSkip ? req.session.enquireSkip : 0;
    if (req.query && req.query.pagination) {
      if (req.query.pagination === "next") {
        skipQty = skipQty += 20;
      }
      if (skipQty !== 0 && req.query.pagination === "prev") {
        skipQty = skipQty -= 20;
      }
    } else {
      skipQty = 0;
    }
    Enquires.find()
      .sort({ date: -1 })
      .limit(20)
      .skip(skipQty)
      .then(enquires => {
        if (!enquires) {
          return res.render("admin-console", {
            alert: "Failed to find vehicles!"
          });
        }
        req.session.enquireSkip = skipQty;
        const alert =
          req.query.alert && req.query.alert.length ? req.query.alert : "";
        return res.render("admin-enquires.pug", { enquires, alert });
      })
      .catch(e => {
        logError(e, "Error > renderEnquires()");
        res.render("admin-console", {
          alert: "Technical problem with finding enquires!"
        });
      });
  }

  renderAdverts(req, res) {
    let skipQty = req.session.adminSkip ? req.session.adminSkip : 0;
    if (req.query && req.query.pagination) {
      if (req.query.pagination === "next") {
        skipQty = skipQty += 20;
      }
      if (skipQty !== 0 && req.query.pagination === "prev") {
        skipQty = skipQty -= 20;
      }
    } else {
      skipQty = 0;
    }
    Property.find()
      .sort({ date: -1 })
      .limit(20)
      .skip(skipQty)
      .then(adverts => {
        if (!adverts) {
          return res.render("admin-console", {
            alert: "Failed to find properties!"
          });
        }
        req.session.adminSkip = skipQty;
        const alert =
          req.query.alert && req.query.alert.length ? req.query.alert : "";
        return res.render("admin-adverts.pug", { adverts, alert });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderAdverts()");
        return res.render("admin-console", {
          alert: "Technical problem with finding properties!"
        });
      });
  }
  renderUsers(req, res) {
    let skipQty = req.session.userSkip ? req.session.userSkip : 0;
    if (req.query && req.query.pagination) {
      if (req.query.pagination === "next") {
        skipQty = skipQty += 20;
      }
      if (skipQty !== 0 && req.query.pagination === "prev") {
        skipQty = skipQty -= 20;
      }
    } else {
      skipQty = 0;
    }

    Users.find()
      .sort({ joined_date: -1 })
      .limit(20)
      .skip(skipQty)
      .then(users => {
        req.session.userSkip = skipQty;
        const alert =
          req.query.alert && req.query.alert.length ? req.query.alert : "";
        return res.render("admin-users.pug", { users, alert });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderUsers()");
        res.render("admin-console.pug", {
          alert: "Failed to find users"
        });
      });
  }
  renderSingleUser(req, res) {
    Users.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.redirect("/admin/users?alert=User%20does%20not%20exist!");
        }
        res.render("admin-single-user", { user });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderSingleUser()");
        return res.redirect(
          "/admin/users?alert=technical%20problem%20with%20finding%20user!"
        );
      });
  }

  renderSingleEnquire(req, res) {
    Enquires.findById(req.params.id)
      .then(enquire => {
        if (!enquire) {
          return res.redirect(
            "/admin/enquires?alert=Enquire%20does%20not%20exist!"
          );
        }
        return res.render("admin-single-enquire", { enquire });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderSingleEnquire()");
        return res.redirect(
          "/admin/enquires?alert=technical%20problem%20with%20finding%20enquire!"
        );
      });
  }

  renderSingleAdvert(req, res) {
    Property.findById(req.params.id)
      .then(property => {
        if (!property) {
          return res.redirect(
            "/admin/properties?alert=Property%20does%20not%20exist!"
          );
        }
        return res.render("admin-single-advert", { property });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderSingleAdvert()");
        return res.redirect(
          "/admin/adverts?alert=technical%20problem%20with%20finding%20property!"
        );
      });
  }

  renderSingleAdvertByUrl(req, res) {
    Property.findOne({ url: req.params.url })
      .then(property => {
        if (!property) {
          return res.redirect(
            "/admin/properties?alert=Property%20does%20not%20exist!"
          );
        }
        return res.render("admin-single-advert", { property });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderSingleAdvert()");
        return res.redirect(
          "/admin/adverts?alert=technical%20problem%20with%20finding%20property!"
        );
      });
  }

  logout(req, res) {
    if (req.session) {
      req.session.destroy();
    }
    return res.redirect("/");
  }

  renderLoginPage(req, res) {
    return res.render("admin-login.pug");
  }

  auth(req, res) {
    AdminUser.authenticate(req.body.email, req.body.password, user => {
      if (!user) {
        return res.render("admin-login.pug", {
          alert: "No match!"
        });
      }
      req.session.adminUserId = user._id;
      return res.redirect("/admin/console");
    });
  }

  requiresLogin(req, res, next) {
    return req.session && req.session.adminUserId
      ? next()
      : res.redirect("/admin/login");
  }

  findUser(req, res) {
    Users.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.redirect("/admin/users?alert=User%20does%20not%20exist!");
        }
        return res.render("admin-single-user", { user });
      })
      .catch(e => {
        logError(e, "Error: Admin > findUser()");
        return res.redirect(
          "/admin/users?alert=technical%20problem%20with%20finding%20user!"
        );
      });
  }

  findAdvert(req, res) {
    Property.findOne({ ref: req.body.ref.toUpperCase() })
      .then(property => {
        if (!property) {
          return res.redirect(
            "/admin/adverts?alert=Property%20does%20not%20exist!"
          );
        }
        return res.render("admin-single-advert", { property });
      })
      .catch(e => {
        logError(e, "Error: Admin > findAdvert()");
        return res.redirect(
          "/admin/adverts?alert=technical%20problem%20with%20finding%20property!"
        );
      });
  }

  editUser(req, res) {
    const updateObj = {
      name: req.body.name,
      email: req.body.email,
      posts_allowed: parseInt(req.body.credit)
    };
    if (req.body.password) {
      updateObj.password = Users.hashPassword(req.body.password);
    }
    if (req.body.confirm) {
      updateObj.email_confirmed = true;
    }

    Users.findByIdAndUpdate(req.body.userId, updateObj, { new: true })
      .then(user => {
        if (!user) {
          return res.redirect("/admin/users?alert=User%20does%20not%20exist!");
        }
        return res.render("admin-single-user", { user, alert: "User updated" });
      })
      .catch(e => {
        logError(e, "Error: Admin > editUser()");
        return res.redirect(
          "/admin/users?alert=technical%20problem%20with%20editing%20user!"
        );
      });
  }

  editAdvert(req, res) {
    const updateObj = {
      town: req.body.town,
      region: req.body.region,
      detail: req.body.detail,
      price: parseInt(req.body.price)
    };

    Property.findByIdAndUpdate(req.body.advertId, updateObj, { new: true })
      .then(property => {
        if (!property) {
          return res.redirect(
            "/admin/adverts?alert=Property%20does%20not%20exist!"
          );
        }
        return res.render("admin-single-advert", {
          property,
          alert: "Advert updated"
        });
      })
      .catch(e => {
        logError(e, "Error: Admin > editAdvert()");
        return res.redirect(
          "/admin/adverts?alert=technical%20problem%20with%20editing%20property!"
        );
      });
  }

  removeUser(req, res) {
    Users.remove({ email: req.body.email })
      .then(({ n }) => {
        return !n
          ? res.redirect("/admin/users?alert=User%20does%20not%20exist!")
          : res.redirect("/admin/users?alert=User%20has%20removed!");
      })
      .catch(e => {
        logError(e, "Error: Admin > removeUser()");
        return res.redirect(
          "/admin/users?alert=technical%20problem%20with%20removing%20user!"
        );
      });
  }

  removeEnquire(req, res) {
    Enquires.remove({ _id: req.body.id })
      .then(({ n }) => {
        if (!n) {
          return res.redirect(
            "/admin/enquires?alert=Enquire%20does%20not%20exist!"
          );
        }
        return res.redirect("/admin/enquires?alert=Enquire%20has%20removed!");
      })
      .catch(e => {
        logError(e, "Error: Admin > removeEnquire()");
        return res.redirect(
          "/admin/enquires?alert=technical%20problem%20with%20removing%20enquire!"
        );
      });
  }

  removeAdvert(req, res) {
    Property.findOne({ ref: req.body.ref })
      .then(property => {
        if (!property) {
          return res.redirect(
            "/admin/adverts?alert=Advert%20does%20not%20exist!"
          );
        }
        if (property.img_directory !== "placeholders") {
          const directoryPath = path.join(
            "./static/images/property-uploads/",
            property.img_directory + "/"
          );
          rimraf(directoryPath, function() {
            property.remove();
          });
        } else {
          property.remove();
        }
        // remove advert from user record
        Users.findById(req.body.userId)
          .then(user => {
            user.posts = user.posts.filter(property => {
              const url = property[0];
              return url !== body.propertyUrl;
            });
            user.save();
            return res.redirect("/admin/adverts?alert=Advert%20has%20removed!");
          })
          .catch(e => {
            logError(e, "Error: Admin > removeAdvertFromUser()");
            return res.redirect(
              "/admin/adverts?alert=technical%20problem%20with%20removing%20advert!"
            );
          });
      })
      .catch(e => {
        logError(e, "Error: Admin > removeAdvert()");
        return res.redirect(
          "/admin/adverts?alert=technical%20problem%20with%20removing%20advert!"
        );
      });
  }
}

new AdminRouter(router);

module.exports = router;
