import React, { Component, Fragment } from "react";
import Link from "next/link";
import _isEmpty from "lodash.isempty";
import axios from 'axios';
import Router from "next/router";
import { removeUserDataFromLocalStorage, getUserDataFromLocalStorage } from "../../helpers/localStorage.js";
import {
  locationRegionSelectField,
  locationTownSelectField
} from "../shared/data.js";

export default class Navigation extends Component {
  state={
    user: {}
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
    const user = getUserDataFromLocalStorage();
    return !_isEmpty(user) ? this.setState({user}) : undefined; 
  }

  logout = () => {
    axios.get("/auth/user/logout");
    removeUserDataFromLocalStorage();
    window.location.pathname !== "/"
      ? Router.push("/")
      : window.location.reload(false);
  };
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
                    <h2>Regions</h2>
                    {locationRegionSelectField.map(({ value, text }, i) => {
                      if (i > 0) {
                        return (
                          <Link href={`/properties/latest?region=${value}`}>
                            <a>{text}</a>
                          </Link>
                        );
                      }
                    })}
                  </div>
                  <div className="navigation__navbar-location-menu-items">
                    <h2>Regions</h2>
                    {locationTownSelectField.map(({ value, text }, i) => {
                      if (i > 0) {
                        return (
                          <Link href={`/properties/latest?town=${value}`}>
                            <a>{text}</a>
                          </Link>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
            {!_isEmpty(this.state.user) ? (
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
} 