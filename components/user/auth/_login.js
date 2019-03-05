import React, { Component } from "react";
import Router from "next/router";
import Recaptcha from "react-google-invisible-recaptcha";
import { popupWindow, checkForPopup } from "../../../helpers/client/popup.js";
import {
  removeUserDataFromLocalStorage,
  saveUserDataToLocalStorage
} from "../../../helpers/client/localStorage.js";
import { displayLoader } from "../../../helpers/client/btn-loader.js";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      email: "",
      password: "",
      isVerified: false
    };
    this.popupMsg = "";
  }

  render() {
    return (
      <section className="user-register-form" id="loginForm">
        <form className="default-form" onSubmit={this.formOnSubmit}>
          <label for="email">Email</label>
          <input
            type="email"
            placeholder=" @"
            id="email"
            name="email"
            minLength="7"
            required="required"
            maxLength="110"
            onChange={this.inputChange}
          />
          <label for="password">Password</label>
          <input
            type="password"
            placeholder=" 
            Password"
            id="password"
            minLength="8"
            name="password"
            required="required"
            maxLength="100"
            onChange={this.inputChange}
          />
          <button
            id="loginSubmitBtn"
            type="submit"
            onClick={this.buttonOnClick}
          >
            Sign in!
          </button>
          <Recaptcha
            ref={ref => (this.recaptcha = ref)}
            sitekey="6LcukYkUAAAAAGe1UDZbm06NvJ2dvywuj3nfHfmC"
            onResolved={this.onResolved}
          />
        </form>
      </section>
    );
  }

  componentDidMount() {
    checkForPopup();
    removeUserDataFromLocalStorage();
  }

  inputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  buttonOnClick = () => {
    if (this.state.email && this.state.password) {
      return this.recaptcha.execute();
    }
    this.popupMsg = "Please fill required form fields!";
    this.recaptcha.reset();
  };

  formOnSubmit = async e => {
    e.preventDefault();

    if (this.state.isVerified && !this.popupMsg.length) {
      // add register button a loader img
      displayLoader("#loginSubmitBtn");
      const { data } = await axios.post("/auth/user/login", {
        email: this.state.email,
        password: this.state.password
      });
      if (data._id) {
        saveUserDataToLocalStorage(data);
        return Router.push("/user/console");
      }
      popupWindow("loginForm", "Incorrect email or password!");
    } else {
      if (this.popupMsg.length) {
        popupWindow("loginForm", this.popupMsg);
        return (this.popupMsg = "");
      }
      popupWindow("loginForm", "Please tick the box!");
    }
  };

  onResolved = () => {
    const res = this.recaptcha.getResponse();
    if (res && res.length && typeof res === "string") {
      this.setState({
        isVerified: true
      });
    }
  };
}
