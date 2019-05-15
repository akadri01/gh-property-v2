import React, { Fragment,Component } from "react";
import _isEmpty from "lodash.isempty";
import Head from "next/head";
import "./styles/Main.scss";
import { clientAuth } from "./helpers/utility-func.js";
import Navigation from "./components/navigation/navigation";
import Footer from "./components/footer/footer";
import UserAdverts from "./components/user/user-adverts/user-adverts";

export default class UserAds extends Component {
  state = {
    user: {}
  };
  render() {
    <Fragment>
      <Head>
        <title>WeGhana Real Estate</title>
        <meta name="description" content="Ghana real estate web platform" />
      </Head>
      <Navigation />
      <Fragment>
        {_isEmpty(this.state.user) ? (
          ""
        ) : (
          <UserAdverts {...this.state.user} />
        )}
      </Fragment>
      <Footer />
    </Fragment>
  }
  componentDidMount() {
    const user = clientAuth("/user/auth");
    return !Array.isArray(user.posts)
      ? Router.push("/user/auth")
      : this.setState({ user });
  }
}
