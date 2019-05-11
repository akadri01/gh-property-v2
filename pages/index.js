import Head from "next/head";
import _before from "lodash.before";
import { Waypoint } from "react-waypoint";
import axios from 'axios';
import React, { Component, Fragment } from "react";
import Link from "next/link";
import Navigation from "./components/navigation/navigation.js";
import Banner from "./components/banner/banner";
import TownNavigation from "./components/town-nav/town-nav";
import Footer from "./components/footer/footer";
import BuySellRentTabs from "./components/trio-tabs/trio-tabs";
import SimpleThumbnail from "./components/thumbnails/simple-thumbnail.js";
import { placeholderProperties } from "./helpers/placeholders.js";
import "./styles/Main.scss";

export default class Home extends Component {
  state={
    properties: []
  }
  insertProperties = properties => properties.map(property => <SimpleThumbnail {...property} />);
  fetchproperties = async () => axios.get("/api/fetch/homepage/properties/recent").then(({data}) => this.setState({properties:data}));
  render(){
    return(
      <Fragment>
        <Head>
          <title>WeGhana Real Estate</title>
          <meta name="description" content="Buy and sell house, land in Ghana" />
        </Head>
        <Navigation />
        <Banner />
        <TownNavigation />
        <Waypoint onEnter={_before(2, this.fetchproperties)} />
        <section className="recentAds mobile-desktop-frame">
          <div className="default-group">
            <h1>Recently added properties in Ghana</h1>
            <p>
              { this.state.properties.length ? "We have listed most recent properties for you" : "No recent properties to view" }
            </p>
          </div>
          <div className="recentAds__frame">
            {this.state.properties.length
              ? this.insertProperties(this.state.properties)
              : this.insertProperties(placeholderProperties(8))}
          </div>
        </section>
        <style>{`
          .recentAds {
            margin-top: 45px;
          }
          .recentAds__frame {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          @media (min-width: 720px) {
            .recentAds {
              margin-top: 100px;
            }
          }
        `}</style>
        <BuySellRentTabs />
        <Footer />
      </Fragment>
    )
  }
}