import React from "react";
import Head from "next/head";
import "../public/styles/Main.scss";

// Components
import Navigation from '../components/navigation/navigation';
import Banner from '../components/banner/banner';

const home = props => {
  return (
    <section>
      <Head>
        <title>WeGhana Real Estate</title>
        <meta name="description" content="Ghana realt estate web platform" />
      </Head>
      <Navigation/>
      <Banner/>
    </section>
  );
};

export default home;
