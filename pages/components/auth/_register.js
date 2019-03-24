import React, { Component } from "react";
import Router from "next/router";
import { reduxForm, Field } from "redux-form";
import isValidEmail from "sane-email-validation";
import { required, email, length, confirmation } from "redux-form-validators";

import { registerUser } from "../../redux/actions";
import { renderFormInput } from "../../helpers/reduxForm";
import { saveUserDataToLocalStorage } from "../../helpers/localStorage.js";
import { popupWindow, checkForPopup } from "../../helpers/popup.js";
import { displayLoader, removeLoader } from "../../helpers/btn-loader.js";

class registerForm extends Component {
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.userRegister)}
        id="registerForm"
        className="default-redux-form"
      >
        <div className="register-form-flex">
          <Field
            name="name"
            label=" Full name"
            placeholder=" Name"
            type="text"
            component={renderFormInput}
            validate={[required(), length({ min: 3, max: 90 })]}
          />
        </div>
        <div className="register-form-flex">
          <Field
            name="email"
            label="Email"
            type="email"
            placeholder=" @"
            component={renderFormInput}
            validate={[required(), email()]}
          />
        </div>
        <div className="register-form-flex">
          <Field
            name="password"
            label="Password"
            type="password"
            component={renderFormInput}
            validate={[required(), length({ min: 8, max: 100 })]}
          />
        </div>
        <div className="register-form-flex">
          <Field
            name="passwordRepeat"
            label="Confirm password"
            type="password"
            component={renderFormInput}
            validate={confirmation({
              field: "password",
              fieldLabel: "Password",
              caseSensitive: true
            })}
          />
        </div>
        <button
          type="submit"
          disabled={this.props.submitting}
          id="registerSubmitBtn"
        >
          Register
        </button>
      </form>
    );
  }

  userRegister = async formValues => {
    if (!isValidEmail(formValues.email)) {
      return popupWindow("registerForm", "Please enter a valid email!");
    }
    displayLoader("#registerSubmitBtn");
    const { payload } = await this.props.dispatch(registerUser(formValues));
    removeLoader("#registerSubmitBtn");
    if (payload._id) {
      saveUserDataToLocalStorage(data);
      return Router.push("/user/console");
    }
    if (payload.dublicate) {
      return popupWindow("registerForm", "You are already registered!");
    }
    popupWindow(
      "registerForm",
      "Due to a technical issue, we are not able to accept new members, please try again later."
    );
  };

  componentDidMount() {
    checkForPopup();
  }
}

registerForm = reduxForm({
  form: "registerForm"
})(registerForm);

export default registerForm;
