import React, { Component, Fragment } from "react";
import Router from "next/router";
import Head from "next/head";
import axios from "axios";
import "../styles/Main.scss";
import { retrieveFormValues } from "../helpers/utility-func.js";
import Navigation from "../components/navigation/navigation.js";
import Footer from "../components/footer/footer";
import { popupWindow } from "../helpers/popup.js";

export default class Contact extends Component {
  state={
    enquire: false,
    msg: ''
  }
  postEnquire = e => {
    e.preventDefault();
    const values = retrieveFormValues(e.target.elements);
    axios.post("/api/enquire", values).then(()=> {
      return this.setState({ 
        enquire: true,
        msg: "We have received your enquire, please allow us 24 hours to process."
      });
    }).catch(e => this.setState({msg: "Unfortunately we were not able to receive your enquire. Please try again later."}));
  }
  componentDidUpdate = () => this.state.enquire && popupWindow("postEnquireForm", this.state.msg);
  render() {
    return (
      <Fragment>
        <Head>
          <title>WeGhana Autotrader</title>
          <meta name="description" content="Ghana auto trading web platform" />
        </Head>
        <Navigation />
        <section className="contactus mobile-desktop-frame" id="contact-form">
          <h1>Contact us</h1>
          <div className="contactus__info">
            <div>
              <b>Phone</b> &nbsp;+233 302 785508
            </div>
            <div>
              <b>Email</b>&nbsp;&nbsp;&nbsp; info@weghana-property.com
            </div>
          </div>
          {!this.state.enquire ? (
            <form
              className="default-form"
              id="postEnquireForm"
              onSubmit={this.postEnquire}
            >
              <div className="desktop-flex">
                <label>Name</label>
                <input type="text" name="name" placeholder=" Your name" minLength="2" maxLength="30" required/>
              </div>
              <div className="desktop-flex">
                <label>Phone or Email</label>
                <input type="text" name="contact" placeholder=" Phone or Email" minLength="6" maxLength="40" required/>
              </div>
              <label>Your message</label>
              <textarea name="text" placeholder=" Tell us..." minLength="10" maxLength="3000" required></textarea>
              <button type="submit">
                Send
              </button>
            </form>
          ) : (
            <div style={{ "marginBottom": "40vh" }} />
          )}
        </section>
        <style>{`
          .contactus {
            width: 90%;
            margin: 80px auto 10vh;
          }
          .contactus form {
            width: 270px;
          }
          .contactus form * {
            display: block;
          }
          .contactus__info {
            margin: 20px 0;
            font-family: "Lato", sans-serif;
          }
          .contactus__info div {
            margin-bottom: 4px;
          }
          @media (min-width: 720px) {
            .contactus {
              margin-top: 14vh;
              margin-bottom: 15vh;
            }
            .contactus form {
              width: 460px;
            }
          }
        `}</style>       
        <Footer />
      </Fragment>
    );
  }
}