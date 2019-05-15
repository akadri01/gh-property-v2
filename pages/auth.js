import React, { Fragment } from "react";
import Head from "next/head";
import "./styles/Main.scss";
import Navigation from "./components/navigation/navigation.js";
import Footer from "./components/footer/footer";
import Auth from "./components/user/auth/index.js";

export default () => (
  <Fragment>
    <Head>
      <title>WeGhana Real Estate</title>
      <meta name="description" content="Ghana real estate web platform" />
    </Head>
    <Navigation />
    <Auth />
    <Footer />
  </Fragment>
);
