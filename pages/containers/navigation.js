import React, { Component } from "react";
import { connect } from "react-redux";
import { adjustNavForLocalUser } from "../redux/actions";
import Navigation from "../components/navigation/navigation";

class Nav extends Component {
  render() {
    return <Navigation localUser={this.props.user} />;
  }

  componentDidMount() {
    this.props.adjustNavbar();
  }
}

function mapStateToProps(state) {
  return {
    localUser: state.user.userData
  };
}

const mapDispatchToProps = dispatch => {
  return {
    adjustNavbar: () => dispatch(adjustNavForLocalUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
