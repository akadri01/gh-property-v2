import React, { Component, Fragment } from "react";
import Router from "next/router";
import isAuthorized from "../helpers/auth-on-client.js";
import { checkForPopup } from "../helpers/popup.js";
import { connect } from "react-redux";
import { refreshUserConsole } from "../redux/actions";
import UserConsole from "../components/user/console/console.js";

class UserData extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <Fragment>
        {this.props.user ? <UserConsole userData={this.props.user} /> : ""}
      </Fragment>
    );
  }

  async componentDidMount() {
    const user = await isAuthorized("/user/auth");
    user.posts_allowed < 1
      ? Router.push("/user/topup")
      : this.props.updateConsole(user);
    checkForPopup();
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateConsole: user => dispatch(refreshUserConsole(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserData);
