import React, { Fragment } from "react";
import Link from "next/link";
import associateImgPath from "../../helpers/associate-image-path.js";
import isPlural from "../../helpers/isPlural.js";
import { beautifyPrice, beautifyDate } from "../../helpers/beautify.js";
import createTitle from "../../helpers/create-title.js";
import PaginationBar from "../pagination-bar/pagination-bar.js";

export default props => {
  return (
    <section className="listing mobile-desktop-frame">
      <h1 className="listing-title">
        {props.searchResultsQty == 0 ? (
          "No properties to view"
        ) : (
          <Fragment>
            {props.searchResultsQty}{" "}
            {isPlural(props.searchResultsQty, "Property", "ies")} to view
          </Fragment>
        )}
      </h1>
      <div className="listing__container">
        {props.properties.map(
          ({
            url,
            images,
            img_directory,
            title,
            advert_type,
            premises_type,
            town,
            price,
            date,
            located_floor,
            area,
            rooms_qty,
            age
          }) => {
            return (
              <Link href={`/property/${url}`}>
                <a className="listing__container-item">
                  <img
                    src={associateImgPath(img_directory, images[0])}
                    alt={`Property in ${town}`}
                    title={createTitle(advert_type, premises_type, town)}
                    className="listing__container-item-img"
                  />
                  <div className="listing__container-item-info">
                    <h2 className="listing__container-item-info-title">
                      {title}
                    </h2>
                    <div className="listing__container-item-info-location">{`${premises_type} - ${town}`}</div>
                    <div className="listing__container-item-info-icons">
                      <span className="listing__container-item-info-icons-rooms">
                        {rooms_qty == 0 ? "No rooms" : rooms_qty}
                      </span>
                      <span className="listing__container-item-info-icons-area">
                        {area}m2
                      </span>
                      <span className="listing__container-item-info-icons-floor">
                        {located_floor == 0 ? (
                          "Entrance"
                        ) : (
                          <Fragment>{located_floor}nth floor</Fragment>
                        )}
                      </span>
                    </div>
                    <div className="listing__container-item-info-price">
                      {beautifyPrice(price)}
                    </div>
                    <div className="listing__container-item-info-date">
                      {beautifyDate(date)}
                    </div>
                    {age == 0 && (
                      <div className="listing__container-item-info-age">
                        New build
                      </div>
                    )}
                  </div>
                </a>
              </Link>
            );
          }
        )}
      </div>
      <PaginationBar {...props} />
    </section>
  );
};
