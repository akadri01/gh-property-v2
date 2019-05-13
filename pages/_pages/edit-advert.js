import React, { Fragment, Component } from "react";
import Head from "next/head";
import _isEmpty from "lodash.isempty";
import "../styles/Main.scss";
import fetch from "../helpers/fetch";
import Navigation from "../components/navigation/navigation";
import Footer from "../components/footer/footer";
import Router from "next/router";
import { clientAuth } from "../helpers/utility-func.js";
import EditAdvertComponent from "../components/user/edit-advert/edit-advert.js";

export default class EditAd extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state={
      user: {}
    }
  }

  static async getInitialProps({ query }) {
    const property = await fetch(`/api/fetch/property/${query.id}`);
    return _isEmpty(property) ? { property: false } : { property };
  }

  render() {
    return(
      <Fragment>
        <Head>
          <title>WeGhana Real Estate</title>
          <meta name="description" content="Ghana real estate web platform" />
        </Head>
        <Navigation />
        {!_isEmpty(this.state.user) && ( 
          <EditAdvertComponent
            user={this.state.user}
            property={this.props.property}
          />
        )}
        <Footer />
      </Fragment>
    )
  }

  componentDidMount() {
    const user = clientAuth("/user/auth?popup=Please%20log%20into%20your%20account%20before%20editing%20your%20adverts.");
    return this.props.property ? this.setState({ user }) : Router.push("/user/console?popup=This%20advert%20is%20not%20available%20for%20editing.");
  }
} 

