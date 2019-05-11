import React, { Component, Fragment } from "react";
import Router from "next/router";
import isAuthorized from "../helpers/auth-on-client.js";
import _isEmpty from "lodash.isempty";
import UserConsole from "../components/user/console/console.js";

export default class UserData extends Component {
  state={
    user: {}
  }
  render() {
    return (
      <Fragment>
        {!_isEmpty(this.state.user) ? <UserConsole userData={this.state.user} /> : ""}
      </Fragment>
    );
  }

  async componentDidMount() {
    const user = await isAuthorized("/user/auth");
    return user.posts_allowed < 1
      ? Router.push("/user/topup")
      : this.setState({user});
  }
}
