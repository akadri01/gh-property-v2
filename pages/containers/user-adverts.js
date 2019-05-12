import { Component, Fragment } from "react";
import _isEmpty from "lodash.isempty";
import { clientAuth } from "../helpers/utility-func.js";
import UserAdvertsComponent from "../components/user/user-adverts/user-adverts";

export default class UserAdverts extends Component {
  state = {
    user: {}
  };
  render() {
    return (
      <Fragment>
        {_isEmpty(this.state.user) ? (
          ""
        ) : (
          <UserAdvertsComponent {...this.state.user} />
        )}
      </Fragment>
    );
  }
  componentDidMount() {
    const user = clientAuth("/user/auth");
    return !Array.isArray(user.posts)
      ? Router.push("/user/auth")
      : this.setState({ user });
  }
}
