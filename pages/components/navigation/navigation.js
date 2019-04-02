import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import { Regions } from "./_regions.js";
import { Towns } from "./_towns.js";
import { adjustNavForLocalUser } from "../../redux/actions";
import { removeUserDataFromLocalStorage } from "../../helpers/localStorage.js";

class Navigation extends Component {
  render() {
    return (
      <section className="navigation">
        <div className="mobile-desktop-frame">
          <div className="navigation__brand">
            <Link href="/">
              <a className="navigation__brand-logo">
                <img
                  src="/static/images/icons/logo-small.png"
                  alt="WeGhana logo"
                  title="Go to home page"
                />
              </a>
            </Link>
            <div
              className="navigation__brand-burger"
              id="navBurger"
              onClick={e => {
                document
                  .getElementById("navMenu")
                  .classList.toggle("show-navigation-menu");
                document
                  .getElementById("navBurger")
                  .classList.toggle("animate-burger-icon");
              }}
            >
              <span className="top" />
              <span className="middle" />
              <span className="bottom" />
            </div>
          </div>
          <nav className="navigation__navbar" id="navMenu">
            <Link href="/properties/latest?advert_type=sale">
              <a className="links">buy</a>
            </Link>
            <Link href="/properties/latest?advert_type=rent">
              <a className="links">rent</a>
            </Link>
            <div
              className="navigation__navbar-location"
              id="locationDownArrow"
              onClick={() => {
                document
                  .getElementById("locationMegaMenu")
                  .classList.toggle("show-location-menu");
                document
                  .getElementById("locationDownArrow")
                  .classList.toggle("replace-arrow-with-close");
              }}
            >
              <span className="navigation__navbar-location-title">
                locations
              </span>
              <div
                className="navigation__navbar-location-menu"
                id="locationMegaMenu"
              >
                <div className="mobile-desktop-frame">
                  <div className="navigation__navbar-location-menu-items">
                    {Regions}
                  </div>
                  <div className="navigation__navbar-location-menu-items">
                    {Towns}
                  </div>
                </div>
              </div>
            </div>
            {this.props.localUser ? (
              this.isProfilePage
            ) : (
              <Link href="/user/auth">
                <a className="links">Login-Register</a>
              </Link>
            )}
            <Link href="/user/console">
              <a className="navigation__navbar-btn">
                <button>post an ad</button>
              </a>
            </Link>
          </nav>
        </div>
      </section>
    );
  }

  get isProfilePage() {
    return window.location.pathname === "/user/console" ? (
      <a onClick={this.logout} className="links">
        Logout
      </a>
    ) : (
      <Fragment>
        <Link href="/user/console">
          <a className="links">My page</a>
        </Link>
        <a onClick={this.logout} className="links">
          Logout
        </a>
      </Fragment>
    );
  }

  componentDidMount() {
    this.props.dispatch(adjustNavForLocalUser());
  }

  logout = () => {
    axios.get("/auth/user/logout");
    removeUserDataFromLocalStorage();
    window.location.pathname !== "/"
      ? Router.push("/")
      : window.location.reload(false);
  };
}

function mapStateToProps(state) {
  return {
    localUser: state.user.userData
  };
}

export default connect(mapStateToProps)(Navigation);
