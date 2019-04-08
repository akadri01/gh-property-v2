import React, { Component } from "react";
import Router from "next/router";
import { reduxForm, Field } from "redux-form";
import isValidEmail from "sane-email-validation";
import { required, email, length } from "redux-form-validators";

import { loginUser } from "../../../redux/actions";
import { renderFormInput } from "../../../helpers/reduxForm";
import { saveUserDataToLocalStorage } from "../../../helpers/localStorage.js";
import { popupWindow } from "../../../helpers/popup.js";
import { displayLoader, removeLoader } from "../../../helpers/btn-loader.js";

class LoginForm extends Component {
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.userLogin)}
        id="loginForm"
        className="default-redux-form"
      >
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder=" @"
          component={renderFormInput}
          validate={[required(), email()]}
        />
        <Field
          name="password"
          type="password"
          label="Password"
          component={renderFormInput}
          validate={[required(), length({ min: 8 })]}
        />
        <button
          type="submit"
          disabled={this.props.submitting}
          id="loginSubmitBtn"
        >
          Login
        </button>
      </form>
    );
  }

  userLogin = async formValues => {
    if (!isValidEmail(formValues.email)) {
      return popupWindow("loginForm", "Please enter a valid email!");
    }
    displayLoader("#loginSubmitBtn");
    const { payload } = await this.props.dispatch(loginUser(formValues));
    removeLoader("#loginSubmitBtn");
    if (payload) {
      saveUserDataToLocalStorage(payload);
      return Router.push("/user/console");
    }
    popupWindow("loginForm", "Incorrect email or password!");
  };
}

LoginForm = reduxForm({
  form: "loginForm"
})(LoginForm);

export default LoginForm;
