import React from "react";
import Head from "next/head";
import "../../public/styles/Main.scss";

// Components
import Navigation from '../../components/navigation/navigation';
import Footer from '../../components/footer/footer';
import Auth from '../../components/user/auth/auth.js';

export default () => {
  return (
    <section>
      <Head>
        <title>WeGhana Real Estate</title>
        <meta name="description" content="Ghana realt estate web platform" />
      </Head>
      <Navigation/>
      <Auth/>
      <Footer/>
    </section>
  );
};