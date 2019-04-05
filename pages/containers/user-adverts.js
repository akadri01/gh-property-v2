import { Component, Fragment } from "react";
import isAuthorized from "../helpers/auth-on-client.js";
import UserAdvertsComponent from "../components/user/user-adverts/user-adverts";

export default class UserAdverts extends Component {
  state = {
    posts: []
  };
  render() {
    return (
      <Fragment>
        {this.state.posts.length ? (
          <UserAdvertsComponent posts={this.state.posts} />
        ) : (
          ""
        )}
      </Fragment>
    );
  }
  componentDidMount() {
    const { posts } = isAuthorized("/user/auth");
    return !Array.isArray(posts)
      ? Router.push("/user/auth")
      : this.setState({ posts });
  }
}
