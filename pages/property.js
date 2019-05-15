import React, { Fragment, Component } from "react";
import Head from "next/head";
import _isEmpty from "lodash.isempty";
import "./styles/Main.scss";
import Router from "next/router";
import fetch from "./helpers/fetch";
import Navigation from "./components/navigation/navigation";
import Footer from "./components/footer/footer";
import Property from "./components/property/property";

export default class PropertyPage extends Component {
  static async getInitialProps({ query }) {
    const property = await fetch(`/api/fetch/property/${query.id}`);
    return _isEmpty(property) ? { property: false } : { property };
  }
  render() {
    return (
      <Fragment>
        <Head>
          <title>WeGhana Real Estate</title>
          <meta name="description" content="Ghana real estate web platform" />
        </Head>
        <Navigation />
        {this.props.property && <Property {...this.props.property} />}
        <Footer />
      </Fragment>
    );
  }
  componentDidMount() {
    return (
      !this.props.property && Router.push("/properties/latest?advert_type=sale")
    );
  }
}
