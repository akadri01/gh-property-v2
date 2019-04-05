import React, { Fragment } from "react";
import Head from "next/head";
import "../styles/Main.scss";
import Navigation from "../components/navigation/navigation";
import Footer from "../components/footer/footer";
import UserAdverts from "../components/user/user-adverts/user-adverts";

export default () => (
  <Fragment>
    <Head>
      <title>WeGhana Real Estate</title>
      <meta name="description" content="Ghana real estate web platform" />
    </Head>
    <Navigation />
    <UserAdverts />
    <Footer />
  </Fragment>
);
