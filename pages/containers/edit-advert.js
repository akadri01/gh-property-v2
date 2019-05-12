import { Component, Fragment } from "react";
import Router from "next/router";
import _isEmpty from "lodash.isempty";
import { clientAuth } from "../helpers/utility-func.js";
import EditAdvertComponent from "../components/user/edit-advert/edit-advert.js";

export default class EditAdvertContainer extends Component {
  state = {
    user: {}
  };
  render() {
    return (
      <Fragment>
        {!_isEmpty(this.state.user) && (
          <EditAdvertComponent
            user={this.state.user}
            property={this.props.property}
          />
        )}
      </Fragment>
    );
  }
  componentDidMount() {
    const user = clientAuth("/user/auth?popup=Please%20log%20into%20your%20account%20before%20editing%20your%20adverts.");
    return this.props.property ? this.setState({ user }) : Router.push("/user/console?popup=This%20advert%20is%20not%20available%20for%20editing.");
  }
}
