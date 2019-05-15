import React, { Fragment } from "react";
import Router from "next/router";
import Head from "next/head";
import "./styles/Main.scss";
import Navigation from "./components/navigation/navigation";
import Footer from "./components/footer/footer";

export default () => (
  <Fragment>
    <Head>
      <title>WeGhana Real Estate</title>
      <meta name="description" content="Ghana real estate web platform" />
    </Head>
    <Navigation />
    <section className="topup email-confirm-link mobile-desktop-frame">
      <h1>Top up</h1>
      <p>
        Your account balance is empty. To top up your balance, please select a top
        up value from the menu bellow and click on payment button.
      </p>
      <form className="topup__form default-form">
        <select>
          <option value="">Select your top up</option>
          <option value="5">1 post 5 gh₵</option>
          <option value="20">5 posts 20 gh₵</option>
          <option value="35">10 posts 35 gh₵</option>
          <option value="65">25 posts 65gh₵</option>
          <option value="100">50 posts 100gh₵</option>
          <option value="150">100 posts 150gh₵</option>
          <option value="200">200 posts 200gh₵</option>
          <option value="300">500 posts 300gh₵</option>
          <option value="500">1000 posts 500gh₵</option>
        </select>
        <button />
      </form>
    </section>
    <div className="go-to-previous-page mobile-desktop-frame">
      <button
        onClick={() => {
          Router.push("/user/adverts");
        }}
      >
        Posted ads
      </button>
    </div>
    <style>{`
      .topup {
        padding: 80px 0;
      }
      .topup .topup__form * {
        display: block;
      }
      .topup .topup__form select {
        border-color: #f7b64f;
        background-image: url("/static/images/icons/list-orange.svg");
      }
      .topup .topup__form button {
        background: url("/static/images/icons/pay-button.png") no-repeat center;
        height: 290px;
        width: 220px;
        border: 3px solid white;
        background-size: 190px;
        margin: 20px auto;
        border-radius: 15px;
      }
      .topup .topup__form button:hover {
        border: 3px solid #f7b64f;
      }
      @media (min-width: 767px) {
        .topup .topup__form {
          max-width: 320px;
        }
      }
      @media (min-width: 900px)  {
        margin-top: 30px;
        padding: 110px 0 80px;
      }
    `}</style>
    <Footer />
  </Fragment>
);
