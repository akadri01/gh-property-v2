import React, { Fragment } from "react";
import Head from "next/head";
import "../styles/Main.scss";
import BuyCredit from "../components/buy-credit/buy-credit";
import Navigation from "../components/navigation/navigation";
import Footer from "../components/footer/footer";

export default () => (
  <Fragment>
    <Head>
      <title>WeGhana Real Estate</title>
      <meta name="description" content="Ghana real estate web platform" />
    </Head>
    <Navigation />
    <BuyCredit />
    <Footer />
  </Fragment>
);