import React, { Component } from "react";
import Router from "next/router";
import Recaptcha from "react-google-invisible-recaptcha";
import { popupWindow, checkForPopup } from "../../../helpers/client/popup.js";
import { saveUserDataToLocalStorage } from "../../../helpers/client/localStorage.js";
import { displayLoader } from "../../../helpers/client/btn-loader.js";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      isVerified: false
    };
    this.popupMsg = "";
  }

  render() {
    return (
      <section className="user-register-form" id="registerForm">
        <form className="default-form" onSubmit={this.formOnSubmit}>
          <label for="name">Full name</label>
          <input
            type="text"
            placeholder=" Name"
            id="name"
            name="name"
            minLength="3"
            required="required"
            maxLength="100"
            onChange={this.inputChange}
          />
          <label for="email">Email</label>
          <input
            type="email"
            placeholder=" @"
            id="email"
            name="email"
            minLength="8"
            required="required"
            maxLength="100"
            onChange={this.inputChange}
          />
          <label for="password">Password</label>
          <input
            type="password"
            placeholder=" Password"
            id="password"
            name="password"
            minLength="8"
            required="required"
            maxLength="100"
            onChange={this.inputChange}
          />
          <label for="passwordRepeat">Password confirm</label>
          <input
            type="password"
            minLength="8"
            placeholder=" Confirm password"
            id="passwordRepeat"
            name="passwordRepeat"
            required="required"
            maxLength="100"
            onChange={this.inputChange}
          />
          <button
            id="registerSubmitBtn"
            type="submit"
            onClick={this.buttonOnClick}
          >
            Sign up!
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
  }

  inputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  buttonOnClick = () => {
    const inputValues =
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.passwordRepeat;
    const passwordMatch = this.state.password === this.state.passwordRepeat;

    if (!inputValues) {
      this.popupMsg = "Please fill required form fields";
      this.recaptcha.reset();
    } else if (!passwordMatch) {
      this.popupMsg = "Passwords do NOT match!";
      this.recaptcha.reset();
    } else {
      this.recaptcha.execute();
    }
  };

  formOnSubmit = async e => {
    e.preventDefault();

    if (this.state.isVerified && !this.popupMsg.length) {
      displayLoader("#registerSubmitBtn");
      const { data } = await axios.post("/auth/user/register", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordRepeat: this.state.passwordRepeat
      });
      if (data._id) {
        saveUserDataToLocalStorage(data);
        Router.push("/user/console");
      } else if (data.dublicate) {
        popupWindow("registerForm", "You are already registered!");
      } else {
        popupWindow(
          "registerForm",
          "Due to a technical issue, we are not able to accept new members, please try again later."
        );
      }
    } else {
      if (this.popupMsg.length) {
        popupWindow("registerForm", this.popupMsg);
        return (this.popupMsg = "");
      }
      popupWindow("registerForm", "Please tick the box!");
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
