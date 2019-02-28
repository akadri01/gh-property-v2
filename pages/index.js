import React from "react";
import Head from "next/head";
import "../public/styles/Main.scss";

// Components
import Navigation from '../components/header/navigation/navigation';

const home = props => {
  return (
    <section>
      <Head>
        <title>WeGhana Real Estate</title>
        <meta name="description" content="Ghana realt estate web platform" />
      </Head>
      <Navigation/>
    </section>
  );
};

export default home;
