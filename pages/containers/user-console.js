import React, { Component, Fragment } from "react";
import isAuthorized from "../helpers/auth-on-client.js";
import { connect } from "react-redux";
import { refreshUserConsole } from "../redux/actions";
import UserConsole from "../components/console/console.js";

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
    this.props.updateConsole(user);
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
