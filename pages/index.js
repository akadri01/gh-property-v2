import Head from "next/head";
import { Waypoint } from "react-waypoint";
import _before from "lodash.before";
import _times from "lodash.times";
import { Picture } from "react-responsive-picture";
import axios from 'axios';
import React, { Component, Fragment } from "react";
import Link from "next/link";
import Navigation from "./components/navigation/navigation.js";
import Banner from "./components/banner/banner";
import Footer from "./components/footer/footer";
import SimpleThumbnail from "./components/thumbnails/simple-thumbnail.js";
import "./styles/Main.scss";


const insertImageFrame = (link, locationName, mobileImg, desktopImg) => (
  <Link href={link}>
    <a className="town-nav__town">
      <div className="town-nav__town-content">
        <h2>{locationName}</h2>
        <p>View properties</p>
      </div>
      <Picture
        sources={[
          {
            srcSet: `/static/images/photos/${mobileImg}`,
            media: "(max-width: 890px)"
          },
          {
            srcSet: `/static/images/photos/${desktopImg}`,
            type: "image/jpg"
          }
        ]}
        style={{ width: "100%" }}
        alt="Search for property in Ghana"
      />
    </a>
  </Link>
);

const _accra = insertImageFrame(
  "/properties/latest?town=accra",
  "Accra",
  "accra-mobile.jpg",
  "accra-desktop.jpg"
);
const _kumasi = insertImageFrame(
  "/properties/latest?town=kumasi",
  "Kumasi",
  "kumasi-mobile.jpg",
  "kumasi-desktop.jpg"
);
const _tamale = insertImageFrame(
  "/properties/latest?town=tamale",
  "Tamale",
  "tamale-mobile.jpg",
  "tamale-desktop.jpg"
);
const _takoradi = insertImageFrame(
  "/properties/latest?town=takoradi",
  "Takoradi",
  "takoradi-mobile.jpg",
  "takoradi-desktop.jpg"
);
const _sunyani = insertImageFrame(
  "/properties/latest?town=sunyani",
  "Sunyani",
  "sunyani-mobile.jpg",
  "sunyani-desktop.jpg"
);
const _obuasi = insertImageFrame(
  "/properties/latest?town=obuasi",
  "Obuasi",
  "obuasi-mobile.jpg",
  "obuasi-desktop.jpg"
);

export default class Home extends Component {
  state={
    properties: []
  }
  insertProperties = properties => properties.map(property => <SimpleThumbnail {...property} />);
  fetchproperties = async () => axios.get("/api/fetch/homepage/properties/recent").then(({data}) => this.setState({properties:data}));
  insertPlaceholders = (qty, items = []) => {
    _times(qty, () => {
      items.push({
        advert_type: "...",
        premises_type: "...",
        town: "...",
        title: "...",
        img_directory: "icons",
        images: ["loader.gif"]
      });
    });
    return items;
  }
  render(){
    return(
      <Fragment>
        <Head>
          <title>WeGhana Real Estate</title>
          <meta name="description" content="Buy and sell house, land in Ghana" />
        </Head>
        <Navigation />
        <Banner />
        <section className="town-nav mobile-desktop-frame">
          <div className="default-group">
            <h1>Property locations in Ghana</h1>
            <p>Our property collection for Ghana</p>
            <hr />
          </div>
          <div className="top">
            {_accra}
            {_kumasi}
          </div>
          <div className="middle">
            {_tamale}
            {_takoradi}
            {_sunyani}
          </div>
          <div className="bottom">{_obuasi}</div>
        </section>
        <Waypoint onEnter={_before(2, this.fetchproperties)} />
        <section className="recentAds mobile-desktop-frame">
          <div className="default-group">
            <h1>Recently added properties in Ghana</h1>
            <p>
              { this.state.properties.length ? "We have listed most recent properties for you" : "No recent properties to view" }
            </p>
            <hr/>
          </div>
          <div className="recentAds__frame">
            {this.state.properties.length
              ? this.insertProperties(this.state.properties)
              : this.insertProperties(this.insertPlaceholders(8))}
          </div>
        </section>
        <section className="trioTabs">
          <Link href="/user/console">
            <a className="trioTabs__tab">
              <h2>Create Your Advert</h2>
              <p>Post an add to sell or rent your property!</p>
            </a>
          </Link>
          <Link href="/properties?advert_type=sale">
            <a className="trioTabs__tab">
              <h2>Properties For Sale</h2>
              <p>View all the properties listed for sale!</p>
            </a>
          </Link>
          <Link href="/properties?advert_type=rent">
            <a className="trioTabs__tab">
              <h2>Rental Properties</h2>
              <p>View all the rental properties listed!</p>
            </a>
          </Link>
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
        <Footer />
      </Fragment>
    )
  }
}