import React, { Fragment, Component } from "react";
import Link from "next/link";
import associateImgPath from "../../helpers/associate-image-path.js";
import isPlural from "../../helpers/isPlural.js";
import { beautifyPrice, beautifyDate } from "../../helpers/beautify.js";
import PaginationBar from "../pagination-bar/pagination-bar.js";
import sortPropertyListing from "../../helpers/sortPropertyListing.js";
import { getSortQueryFromLocalStorage } from "../../helpers/localStorage";
import createFailedSearchInfo from "../../helpers/create-failed-search-info.js";

export default class PropertyListing extends Component {
  render() {
    const notFoundStr = createFailedSearchInfo(this.props.searchQuery);
    return (
      <section className="listing mobile-desktop-frame">
        <h1 className="listing--title">
          {this.props.searchResultsQty == 0 ? (
            `No results to show ( ${notFoundStr} )`
          ) : (
            <Fragment>
              {this.props.searchResultsQty}{" "}
              {isPlural(this.props.searchResultsQty, "Property", "ies")} to view
            </Fragment>
          )}
        </h1>
        {this.props.searchResultsQty > 0 && (
          <form className="listing__sort" id="sortForm">
            <label>Sort by:</label>
            <select name="sort" onClick={sortPropertyListing}>
              <option value="latest">Latest adverts</option>
              <option value="lowest">Price (Lowest)</option>
              <option value="highest">Price (Highest)</option>
            </select>
          </form>
        )}
        {this.props.searchResultsQty == 0 && (
          <img
            className="listing--no-result-img"
            src={"/static/images/photos/no-result.png"}
            alt="No results found"
            title={`No properties found for ${notFoundStr}`}
          />
        )}
        <div className="listing__container">
          {this.props.properties.map(
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
                      src={associateImgPath(img_directory, images[0])}
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
                  </a>
                </Link>
              );
            }
          )}
        </div>
        <PaginationBar {...this.props} />
      </section>
    );
  }

  componentDidMount() {
    // set sort select menu options order
    const url = new URL(window.location.href);
    const sortPreference = url.searchParams.get("sort");
    if (sortPreference) {
      const options = document
        .getElementById("sortForm")
        .getElementsByTagName("option");
      [].forEach.call(options, option => {
        if (option.value === sortPreference) {
          option.selected = "selected";
        } else {
          option.removeAttribute("selected");
        }
      });
    }
  }
}
