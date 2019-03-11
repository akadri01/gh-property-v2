import React from "react";
import Head from "next/head";
import "../styles/Main.scss";
import Navigation from '../components/navigation/navigation';
import Footer from '../components/footer/footer';
import Auth from '../components/auth/index.js';

export default () => {
  return (
    <section>
      <Head>
        <title>WeGhana Real Estate</title>
        <meta name="description" content="Ghana real estate web platform" />
      </Head>
      <Navigation/>
      <Auth/>
      <Footer/>
    </section>
  );
};