import React from "react";
import { beautifyDate, beautifyPrice } from "../../helpers/beautify.js";
import Carousel from "../carousel/carousel.js";
import SocialMediaShare from "../social-media-share/social-media-share.js";
import { featuresCheckboxFieldList } from "../shared/data.js";
const featuresList = featuresCheckboxFieldList.map(obj => obj.labelAndValue);

export default ({ property }) => {
  const {
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
  } = property;
  return (
    <section className="mobile-desktop-frame">
      <section className="property">
        <div className="property__header">
          <div className="property__header-info">
            <h3>{title}</h3>
            <p>
              {town},{region}
            </p>
          </div>
          <h4>{beautifyPrice(price)}</h4>
        </div>
        <Carousel images={images} directory={img_directory} />
        <div className="property__icons">
          <div className="property__icons-rooms">
            <span>Total rooms</span>
            <h5>{rooms_qty}</h5>
          </div>
          <div className="property__icons-area">
            <span>Area</span>
            <h5>{area}m2</h5>
          </div>
          <div className="property__icons-floor">
            <span>Located floor</span>
            <h5>{located_floor}</h5>
          </div>
        </div>
        <div className="property__info">
          <h2 className="property-default-title">Premises Information</h2>
          <div className="property__info-list">
            <ul>
              <li>
                <span>Advert Type</span>
                <b>{advert_type}</b>
              </li>
              <li>
                <span>Premises Type</span>
                <b>{premises_type}</b>
              </li>
              <li>
                <span>Age of Premises</span>
                <b>{age}</b>
              </li>
              <li>
                <span>Bathroom Quantity</span>
                <b>{total_bathroom}</b>
              </li>
            </ul>
            <ul>
              <li>
                <span>Balcony</span>
                <b>{total_balcony}</b>
              </li>
              <li>
                <span>Rooms Quantity</span>
                <b>{rooms_qty}</b>
              </li>
              <li>
                <span>Building Floors</span>
                <b>{total_floor}</b>
              </li>
              <li>
                <span>Located Floor</span>
                <b>{located_floor}</b>
              </li>
            </ul>
          </div>
        </div>
        <div className="property__features">
          <h2 className="property-default-title">Features of the Premises</h2>
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
          <h5>{title}</h5>
          <pre dangerouslySetInnerHTML={{ __html: detail }} />
        </div>
      </section>
      <aside className="prop-sidebar">
        <button
          className="prop-sidebar-print-btn"
          onClick={() => {
            window.print();
          }}
        >
          Print
        </button>
        <div className="prop-sidebar__share">
          <button className="prop-sidebar__share-btn">Share</button>
          <SocialMediaShare />
        </div>
        <div className="prop-sidebar__contact">
          <h4 className="prop-sidebar__contact-name">{user_name}</h4>
          <div className="prop-sidebar__contact-email">
            <button className="prop-sidebar__contact-email-btn">
              Send Email
            </button>
            <div className="prop-sidebar__contact-email-hidden">
              {user_email}
            </div>
          </div>
          <div className="prop-sidebar__contact-phone">
            <button className="prop-sidebar__contact-phone-btn">
              Send Email
            </button>
            <div className="prop-sidebar__contact-phone-hidden">{phone}</div>
          </div>
        </div>
      </aside>
    </section>
  );
};

// date: "2019-03-28T09:38:03.807Z"
// ref: "FLBSIKETNY"
// url: "flat1m2ho21cedisbc2baxkzqvwnnqs"
// user_id: "5c9c7099a39a940a94fa62ad"
// _id: "5c9c95fba39a940a94fa62b0"
// advert_type: "sale"
