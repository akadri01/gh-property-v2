import React, { Component, Fragment } from "react";
import { Waypoint } from "react-waypoint";
import _before from "lodash.before";
import { connect } from "react-redux";
import Link from "next/link";
import SimpleThumbnail from "../thumbnails/simple-thumbnail.js";
import { placeholderRecentProperties } from "../shared/data.js";
import { fetchPropertiesForHomePage } from "../../redux/actions/index.js";

class RecentAds extends Component {
  render() {
    return (
      <Fragment>
        <Waypoint onEnter={_before(2, this.fetchRecentProperties)} />
        <section className="recentAds mobile-desktop-frame">
          <div className="default-group">
            <h1>Recently added properties in Ghana</h1>
            <p>We have listed most recent properties for you</p>
          </div>
          <div className="recentAds__frame">
            {this.props.recentProperties
              ? this.insertProperties(this.props.recentProperties)
              : this.insertProperties(placeholderRecentProperties)}
          </div>
        </section>
      </Fragment>
    );
  }

  insertProperties = properties => {
    return properties.map(property => {
      return <SimpleThumbnail {...property} />;
    });
  };

  fetchRecentProperties = async () => {
    this.props.dispatch(fetchPropertiesForHomePage());
  };
}

function mapStateToProps(state) {
  return {
    recentProperties: state.property.recentProperties
  };
}

export default connect(mapStateToProps)(RecentAds);
