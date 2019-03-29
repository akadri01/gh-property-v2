import React, { Fragment, Component } from "react";
import Head from "next/head";
import "../styles/Main.scss";
import fetch from "../helpers/fetch";
import Navigation from "../components/navigation/navigation";
import Footer from "../components/footer/footer";
import PropertyListing from "../components/property-listing/property-listing.js";
import { savePropertySearchQueryToLocalStorage } from "../helpers/localStorage.js";

class Properties extends Component {
  static async getInitialProps({ req }) {
    if (req && req.session) {
      req.session.propertySkip = 10; // ******** change 25 on production
    }
    // req.url format --->  /properties?advert_type=rent&type=flat&...
    const data = await fetch(`/iso/fetch/main${req.url}`);
    if (!data || !data.length || !Array.isArray(data)) {
      return {
        properties: [],
        searchQuery: req.url,
        searchResultsQty: 0
      };
    } else {
      return {
        properties: data[0],
        searchResultsQty: parseInt(data[1]),
        searchQuery: req.url
      };
    }
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>WeGhana Real Estate</title>
          <meta name="description" content="Ghana real estate web platform" />
        </Head>
        <Navigation />
        <PropertyListing {...this.props} />
        <Footer />
      </Fragment>
    );
  }

  componentDidMount() {
    // save search query to local storage (to use for load more property ajax request)
    savePropertySearchQueryToLocalStorage(this.props.searchQuery);
  }
}

export default Properties;
