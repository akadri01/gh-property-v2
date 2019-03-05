import React, { Component } from "react";
import Router from "next/router";
import { popupWindow } from "../../../helpers/client/popup.js";
import { saveUserDataToLocalStorage } from "../../../helpers/client/localStorage.js";
import FacebookLogin from "react-facebook-login";

export default class FacebookLoginForm extends Component {
  render() {
    return (
      <section className="facebook-auth" id="facebookRegisterLogin">
        <FacebookLogin
          appId="306118983364378"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook}
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
      Router.push("/user/console");
    } else {
      popupWindow(
        "facebookRegisterLogin",
        "Authentication has failed, please try again later."
      );
    }
  };
}
