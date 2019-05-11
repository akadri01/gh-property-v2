import React, { Component, Fragment } from "react";
import { Waypoint } from "react-waypoint";
import _before from "lodash.before";
import Link from "next/link";
import axios from 'axios';
import SimpleThumbnail from "../thumbnails/simple-thumbnail.js";
import { placeholderProperties } from "../../helpers/placeholders.js";

export default class RecentAds extends Component {
  state={
    properties: []
  }
  fetchproperties = async () => axios.get("/api/fetch/homepage/properties/recent").then(({data}) => this.setState({properties:data}));
  insertProperties = properties => {
    return properties.map(property => {
          return <SimpleThumbnail {...property} />;
        });
  };
  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}
