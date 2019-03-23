import React, { Fragment } from "react";
import Head from "next/head";
import "./styles/Main.scss";
import { connect } from "react-redux";
import Navigation from "./containers/navigation";
import Banner from "./components/banner/banner";
import TownNavigation from "./components/town-nav/town-nav";
import Footer from "./components/footer/footer";

const Index = () => (
  <Fragment>
    <Head>
      <title>WeGhana Real Estate</title>
      <meta name="description" content="Ghana realt estate web platform" />
    </Head>
    <Navigation />
    <Banner />
    <TownNavigation />
    <Footer />
  </Fragment>
);

export default connect()(Index);
