import React, { Component, Fragment } from "react";
import Link from "next/link";
import _isEmpty from "lodash.isempty";
import Router from "next/router";
import { clientAuth,isPlural } from "../../../helpers/utility-func.js";
import PostAdvert from "./_post-advert";
import UserProfile from "./_user-profile";

export default class UserConsole extends Component {
  state={
    user: {}
  }
  async componentDidMount() {
    const user = await clientAuth("/user/auth");
    return user.posts_allowed < 1
      ? Router.push("/user/topup")
      : this.setState({user});
  }
  render(){
    return (
      <Fragment>
        {!_isEmpty(this.state.user) ? (
          <section className="console mobile-desktop-frame">
            <div className="console__topup">
              <div className="console__topup-text-container">
                <span className="console__topup-text-container-text">Hello {this.state.user.name}</span>
                <span className="console__topup-text-container-text">
                  You've <b>{this.state.user.posts_allowed}</b> {isPlural(this.state.user.posts_allowed, "advert")}{" "}
                  allowence
                </span>
              </div>
              <Link href="/user/topup">
                <a className="console__topup-text-container-btn">Top up</a>
              </Link>
            </div>
            <div className="console__post-advert">
              <PostAdvert user={this.state.user} />
            </div>
            <div className="console__profile">
              <UserProfile {...this.state.user} />
            </div>
          </section>
        ) : ""}
      </Fragment>
    )
  }
}
