import React, { Fragment, Component } from "react";
import Link from "next/link";
import {associateImagePath, isPlural} from "../../helpers/utility-func.js";
import { beautifyPrice, beautifyDate } from "../../helpers/utility-func.js";
import PaginationBar from "../pagination-bar/pagination-bar.js";
import { getSortQueryFromLocalStorage } from "../../helpers/localStorage";
import {createFailedSearchInformation} from "../../helpers/utility-func.js";
import PageInfoTitle from "./_page-title.js";
import SortForm from "./_sort-form.js";
import FilterForm from "./_filter-form.js";
import NotFoundImg from "./_not-found-img.js";

export default props => {
  const notFoundStr = createFailedSearchInformation(props.searchQuery);
  return (
    <section className="listing mobile-desktop-frame">
      <FilterForm />
      <PageInfoTitle
        searchResultsQty={props.searchResultsQty}
        notFoundStr={notFoundStr}
      />
      <SortForm searchResultsQty={props.searchResultsQty} />
      <NotFoundImg
        searchResultsQty={props.searchResultsQty}
        notFoundStr={notFoundStr}
      />
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
            const imageTitle =
              (advert_type === "rent" ? "Rental " : "For Sale ") +
              `${premises_type} in ${town}`;
            return (
              <Link href={`/property/${url}`}>
                <a className="listing__container-item">
                  <img
                    src={associateImagePath(img_directory, images[0])}
                    className="listing__container-item-img"
                    alt={`Property in ${town}`}
                    title={imageTitle}
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
                  <span className="listing__container-item--type">
                    {advert_type === "rent" ? "Rental " : "For Sale "}
                  </span>
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
