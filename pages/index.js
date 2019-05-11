import React, { Fragment } from "react";
import Head from "next/head";
import "./styles/Main.scss";
import { connect } from "react-redux";
import Navigation from "./components/navigation/navigation.js";
import Banner from "./components/banner/banner";
import TownNavigation from "./components/town-nav/town-nav";
import Footer from "./components/footer/footer";
import BuySellRentTabs from "./components/trio-tabs/trio-tabs";
import RecentAds from "./components/recent-ads/recent-ads";

const Index = () => (
  <Fragment>
    <Head>
      <title>WeGhana Real Estate</title>
      <meta name="description" content="Buy and sell house, land in Ghana" />
    </Head>
    <Navigation />
    <Banner />
    <TownNavigation />
    <RecentAds />
    <BuySellRentTabs />
    <Footer />
  </Fragment>
);

export default connect()(Index);
