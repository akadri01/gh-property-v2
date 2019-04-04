import { Fragment } from "react";
import Head from "next/head";
import "../styles/Main.scss";
import Navigation from "../containers/navigation";
import Footer from "../components/footer/footer";
import ContactUs from "../components/contact-us/contact-us.js";

export default () => (
  <Fragment>
    <Head>
      <title>WeGhana Autotrader</title>
      <meta name="description" content="Ghana auto trading web platform" />
    </Head>
    <Navigation />
    <ContactUs />
    <Footer />
  </Fragment>
);
