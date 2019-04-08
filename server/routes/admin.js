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

  renderConsole(req, { render }) {
    render("admin-console.pug");
  }

  renderPayments(req, { render }) {
    render("admin-payments.pug");
  }

  renderEnquires({ query, session }, { render }) {
    let skipQty = session.enquireSkip ? session.enquireSkip : 0;
    if (query && query.pagination) {
      if (query.pagination === "next") {
        skipQty = skipQty += 20;
      }
      if (skipQty !== 0 && query.pagination === "prev") {
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
          return render("admin-console", {
            alert: "Failed to find vehicles!"
          });
        }
        session.enquireSkip = skipQty;
        const alert = query.alert && query.alert.length ? query.alert : "";
        return render("admin-enquires.pug", { enquires, alert });
      })
      .catch(e => {
        logError(e, "Error > renderEnquires()");
        render("admin-console", {
          alert: "Technical problem with finding enquires!"
        });
      });
  }

  renderAdverts({ query, session }, { render }) {
    let skipQty = session.adminSkip ? session.adminSkip : 0;
    if (query && query.pagination) {
      if (query.pagination === "next") {
        skipQty = skipQty += 20;
      }
      if (skipQty !== 0 && query.pagination === "prev") {
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
          return render("admin-console", {
            alert: "Failed to find properties!"
          });
        }
        session.adminSkip = skipQty;
        const alert = query.alert && query.alert.length ? query.alert : "";
        return render("admin-adverts.pug", { adverts, alert });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderAdverts()");
        return render("admin-console", {
          alert: "Technical problem with finding properties!"
        });
      });
  }
  renderUsers({ query, session }, { render }) {
    let skipQty = session.userSkip ? session.userSkip : 0;
    if (query && query.pagination) {
      if (query.pagination === "next") {
        skipQty = skipQty += 20;
      }
      if (skipQty !== 0 && query.pagination === "prev") {
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
        session.userSkip = skipQty;
        const alert = query.alert && query.alert.length ? query.alert : "";
        return render("admin-users.pug", { users, alert });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderUsers()");
        render("admin-console.pug", {
          alert: "Failed to find users"
        });
      });
  }
  renderSingleUser({ params }, { render, redirect }) {
    Users.findById(params.id)
      .then(user => {
        if (!user) {
          return redirect("/admin/users?alert=User%20does%20not%20exist!");
        }
        return render("admin-single-user", { user });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderSingleUser()");
        return redirect(
          "/admin/users?alert=technical%20problem%20with%20finding%20user!"
        );
      });
  }

  renderSingleEnquire({ params }, { render, redirect }) {
    Enquires.findById(params.id)
      .then(enquire => {
        if (!enquire) {
          return redirect(
            "/admin/enquires?alert=Enquire%20does%20not%20exist!"
          );
        }
        return render("admin-single-enquire", { enquire });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderSingleEnquire()");
        return redirect(
          "/admin/enquires?alert=technical%20problem%20with%20finding%20enquire!"
        );
      });
  }

  renderSingleAdvert({ params }, { redirect, render }) {
    Property.findById(params.id)
      .then(property => {
        if (!property) {
          return redirect(
            "/admin/properties?alert=Property%20does%20not%20exist!"
          );
        }
        return render("admin-single-advert", { property });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderSingleAdvert()");
        return redirect(
          "/admin/adverts?alert=technical%20problem%20with%20finding%20property!"
        );
      });
  }

  renderSingleAdvertByUrl({ params }, { redirect, render }) {
    Property.findOne({ url: params.url })
      .then(property => {
        if (!property) {
          return redirect(
            "/admin/properties?alert=Property%20does%20not%20exist!"
          );
        }
        return render("admin-single-advert", { property });
      })
      .catch(e => {
        logError(e, "Error: Admin > renderSingleAdvert()");
        return redirect(
          "/admin/adverts?alert=technical%20problem%20with%20finding%20property!"
        );
      });
  }

  logout({ session }, { redirect }) {
    if (session) {
      session.destroy();
    }
    return redirect("/");
  }

  renderLoginPage(req, { render }) {
    return render("admin-login.pug");
  }

  auth({ session, body }, { render, redirect }) {
    AdminUser.authenticate(body.email, body.password, user => {
      if (!user) {
        return render("admin-login.pug", {
          alert: "No match!"
        });
      }
      session.adminUserId = user._id;
      return redirect("/admin/console");
    });
  }

  requiresLogin({ session }, { redirect }, next) {
    return session && session.adminUserId ? next() : redirect("/admin/login");
  }

  findUser({ body }, { redirect, render }) {
    Users.findOne({ email: body.email })
      .then(user => {
        if (!user) {
          return redirect("/admin/users?alert=User%20does%20not%20exist!");
        }
        return render("admin-single-user", { user });
      })
      .catch(e => {
        logError(e, "Error: Admin > findUser()");
        return redirect(
          "/admin/users?alert=technical%20problem%20with%20finding%20user!"
        );
      });
  }

  findAdvert({ body }, { render, redirect }) {
    Property.findOne({ ref: body.ref })
      .then(property => {
        if (!property) {
          return redirect(
            "/admin/adverts?alert=Property%20does%20not%20exist!"
          );
        }
        return render("admin-single-advert", { property });
      })
      .catch(e => {
        logError(e, "Error: Admin > findAdvert()");
        return redirect(
          "/admin/adverts?alert=technical%20problem%20with%20finding%20property!"
        );
      });
  }

  editUser({ body }, { redirect, render }) {
    const updateObj = {
      name: body.name,
      email: body.email,
      posts_allowed: parseInt(body.credit)
    };
    if (body.password) {
      updateObj.password = Users.hashPassword(body.password);
    }
    if (body.confirm) {
      updateObj.email_confirmed = true;
    }

    Users.findByIdAndUpdate(body.userId, updateObj, { new: true })
      .then(user => {
        if (!user) {
          return redirect("/admin/users?alert=User%20does%20not%20exist!");
        }
        return render("admin-single-user", { user, alert: "User updated" });
      })
      .catch(e => {
        logError(e, "Error: Admin > editUser()");
        return redirect(
          "/admin/users?alert=technical%20problem%20with%20editing%20user!"
        );
      });
  }

  editAdvert({ body }, { redirect, render }) {
    const updateObj = {
      location: body.location,
      details: body.details,
      price: parseInt(body.price)
    };

    Property.findByIdAndUpdate(body.advertId, updateObj, { new: true })
      .then(property => {
        if (!property) {
          return redirect(
            "/admin/adverts?alert=Property%20does%20not%20exist!"
          );
        }
        return render("admin-single-advert", {
          property,
          alert: "Advert updated"
        });
      })
      .catch(e => {
        logError(e, "Error: Admin > editAdvert()");
        return redirect(
          "/admin/adverts?alert=technical%20problem%20with%20editing%20property!"
        );
      });
  }

  removeUser({ body }, { redirect }) {
    Users.remove({ email: body.email })
      .then(({ n }) => {
        if (!n) {
          return redirect("/admin/users?alert=User%20does%20not%20exist!");
        }
        return redirect("/admin/users?alert=User%20has%20removed!");
      })
      .catch(e => {
        logError(e, "Error: Admin > removeUser()");
        return redirect(
          "/admin/users?alert=technical%20problem%20with%20removing%20user!"
        );
      });
  }

  removeEnquire({ body }, { redirect }) {
    Enquires.remove({ _id: body.id })
      .then(({ n }) => {
        if (!n) {
          return redirect(
            "/admin/enquires?alert=Enquire%20does%20not%20exist!"
          );
        }
        return redirect("/admin/enquires?alert=Enquire%20has%20removed!");
      })
      .catch(e => {
        logError(e, "Error: Admin > removeEnquire()");
        return redirect(
          "/admin/enquires?alert=technical%20problem%20with%20removing%20enquire!"
        );
      });
  }

  removeAdvert({ body }, { redirect }) {
    Property.findOne({ ref: body.ref })
      .then(property => {
        if (!property) {
          return redirect("/admin/adverts?alert=Advert%20does%20not%20exist!");
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
        Users.findById(body.userId)
          .then(user => {
            user.posts = user.posts.filter(property => {
              const url = property[0];
              return url !== body.propertyUrl;
            });
            user.save();
            return redirect("/admin/adverts?alert=Advert%20has%20removed!");
          })
          .catch(e => {
            logError(e, "Error: Admin > removeAdvertFromUser()");
            return redirect(
              "/admin/adverts?alert=technical%20problem%20with%20removing%20advert!"
            );
          });
      })
      .catch(e => {
        logError(e, "Error: Admin > removeAdvert()");
        return redirect(
          "/admin/adverts?alert=technical%20problem%20with%20removing%20advert!"
        );
      });
  }
}

new AdminRouter(router);

module.exports = router;
