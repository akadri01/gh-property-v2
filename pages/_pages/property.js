import React, { Fragment, Component } from "react";
import Head from "next/head";
import "../styles/Main.scss";
import fetch from "../helpers/fetch";
import Navigation from "../components/navigation/navigation";
import Footer from "../components/footer/footer";
import Property from "../components/property/property";

const PropertyPage = ({ property }) => {
  return (
    <Fragment>
      <Head>
        <title>WeGhana Real Estate</title>
        <meta name="description" content="Ghana real estate web platform" />
      </Head>
      <Navigation />
      <Property property={property} />
      <Footer />
    </Fragment>
  );
};

PropertyPage.getInitialProps = async ({ query }) => {
  const property = await fetch(`/api/fetch/property/${query.id}`);
  return {
    property
  };
};

export default PropertyPage;
