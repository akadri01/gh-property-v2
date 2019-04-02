import React, { Component } from "react";
import Router from "next/router";
import { popupWindow } from "../../helpers/popup.js";
import { saveUserDataToLocalStorage } from "../../helpers/localStorage.js";
import FacebookLogin from "react-facebook-login";
import { FACEBOOK_APP_ID } from "../../../config/index.js";

export default class FacebookLoginForm extends Component {
  render() {
    return (
      <section className="auth__forms-facebook" id="facebookRegisterLogin">
        <FacebookLogin
          appId={FACEBOOK_APP_ID}
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook}
          textButton="Login with facebook"
        />
      </section>
    );
  }

  responseFacebook = async response => {
    const { data } = await axios.post("/auth/user/facebook", {
      fbUserId: response.userID,
      email: response.email,
      name: response.name
    });
    if (data && data._id) {
      saveUserDataToLocalStorage(data);
      return Router.push("/user/console");
    }
    popupWindow(
      "facebookRegisterLogin",
      "Authentication has failed, please try again later."
    );
  };
}
