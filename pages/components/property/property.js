import React, { Fragment } from "react";
import Router from "next/router";
import { beautifyDate, beautifyPrice } from "../../helpers/beautify.js";
import Carousel from "../carousel/carousel.js";
import SocialMediaShare from "../social-media-share/social-media-share.js";
import {
  featuresCheckboxFieldList,
  premisesAgeSelectField
} from "../shared/data.js";
const featuresList = featuresCheckboxFieldList.map(obj => obj.labelAndValue);

export default ({
  advert_type,
  area,
  age,
  date,
  detail,
  features,
  images,
  img_directory,
  located_floor,
  phone,
  premises_type,
  price,
  ref,
  region,
  posted_by,
  furniture,
  garden,
  rooms_qty,
  title,
  total_balcony,
  total_bathroom,
  total_floor,
  town,
  url,
  user_id,
  _id,
  user_email,
  user_name
}) => {
  return (
    <Fragment>
      <section className="single-property-page mobile-desktop-frame">
        <section className="property">
          <div className="property__header">
            <div className="property__header-info">
              <h3>{title}</h3>
              <p>
                {town}, {region}
              </p>
            </div>
            <h2>{beautifyPrice(price)}</h2>
          </div>
          <div className="property__label">
            <span>{advert_type == "sale" ? "For Sale" : "Rental"}</span>
            <span className="property__label-postedby">
              Posted by {posted_by == "agency" ? "owner" : "agent"}
            </span>
          </div>
          <Carousel images={images} directory={img_directory} />
          <div className="property__icons">
            <div className="property__icons-rooms icon-frame">
              <span>Total rooms</span>
              <h3>{rooms_qty == 0 ? "No rooms" : rooms_qty}</h3>
            </div>
            <div className="property__icons-area icon-frame">
              <span>Area</span>
              <h3>
                {area} M<sup>2</sup>
              </h3>
            </div>
            <div className="property__icons-floor icon-frame">
              <span>Located floor</span>
              <h3>{located_floor == 0 ? "Ground floor" : located_floor}</h3>
            </div>
          </div>
          <div className="property__info">
            <h2 className="property-default-title">General Information</h2>
            <div className="property__info-list">
              <ul>
                <li>
                  <span>Advert Type</span>
                  <b>{advert_type == "sale" ? "For Sale" : "Rental"}</b>
                </li>
                <li>
                  <span>Premises Type</span>
                  <b>{premises_type}</b>
                </li>
                <li>
                  <span>Age of Premises</span>
                  <b>
                    {premisesAgeSelectField.map(obj => {
                      if (obj.value === age.toString()) {
                        return obj.text;
                      }
                    })}
                  </b>
                </li>
                <li>
                  <span>Bathroom Quantity</span>
                  <b>{total_bathroom == 0 ? "No Bathrooms" : total_bathroom}</b>
                </li>
                <li>
                  <span>Garden</span>
                  <b>{garden}</b>
                </li>
              </ul>
              <ul>
                <li>
                  <span>Furnished</span>
                  <b>{furniture}</b>
                </li>
                <li>
                  <span>Balcony</span>
                  <b>{total_balcony == 0 ? "No Balcony" : total_balcony}</b>
                </li>
                <li>
                  <span>Rooms Quantity</span>
                  <b>{rooms_qty == 0 ? "No Rooms" : rooms_qty}</b>
                </li>
                <li>
                  <span>Building Floors</span>
                  <b>{total_floor == 0 ? "No Floors" : total_floor}</b>
                </li>
                <li>
                  <span>Located Floor</span>
                  <b>{located_floor == 0 ? "Ground Level" : located_floor}</b>
                </li>
              </ul>
            </div>
          </div>
          <div className="property__features">
            <h2 className="property-default-title">Features</h2>
            <div className="property__features-list">
              {featuresList.map(feature => {
                const cssClass = features.includes(feature)
                  ? "selected-feature"
                  : "non-selected-feature";
                return <div className={cssClass}>{feature}</div>;
              })}
            </div>
          </div>
          <div className="property__details">
            <h2 className="property-default-title">Details of the Premises</h2>
            <h4>{title}</h4>
            <pre dangerouslySetInnerHTML={{ __html: detail }} />
          </div>
        </section>
        <aside className="prop-sidebar">
          <button
            className="prop-sidebar-print-btn sidebar-btns"
            onClick={() => {
              window.print();
            }}
          >
            Print
          </button>
          <div className="prop-sidebar__share">
            <button
              className="prop-sidebar__share-btn sidebar-btns"
              onClick={() => {
                document
                  .getElementById("socialMediaHidder")
                  .classList.toggle("expose-social-media-share-icons");
              }}
            >
              Share
            </button>
            <div id="socialMediaHidder">
              <SocialMediaShare />
            </div>
          </div>
          <div className="prop-sidebar__contact">
            <h4 className="prop-sidebar__contact-name">{user_name}</h4>
            <div className="prop-sidebar__contact-email">
              <button
                className="prop-sidebar__contact-email-btn"
                onClick={() => {
                  document
                    .getElementById("emailHidden")
                    .classList.toggle("expose-contact-icons");
                }}
              >
                Send Email
              </button>
              <div
                className="prop-sidebar__contact-email-hidden"
                id="emailHidden"
              >
                {user_email}
              </div>
            </div>
            <div className="prop-sidebar__contact-phone">
              <button
                className="prop-sidebar__contact-phone-btn"
                onClick={() => {
                  document
                    .getElementById("phoneHidden")
                    .classList.toggle("expose-contact-icons");
                }}
              >
                By Phone
              </button>
              <div
                className="prop-sidebar__contact-phone-hidden"
                id="phoneHidden"
              >
                {phone}
              </div>
            </div>
          </div>
          <div className="prop-sidebar__reference">
            <div>
              Reference <b>{ref}</b>
            </div>
            <div>
              Date Posted <b>{beautifyDate(date, true)}</b>
            </div>
          </div>
        </aside>
      </section>
      <div className="go-to-previous-page mobile-desktop-frame">
        <button
          onClick={() => {
            Router.back();
          }}
        >
          Previous page
        </button>
      </div>
    </Fragment>
  );
};
