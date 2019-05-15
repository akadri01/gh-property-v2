import React, { Fragment, Component, useEffect } from "react";
import Link from "next/link";
import {associateImagePath, isPlural} from "../../helpers/utility-func.js";
import { beautifyPrice, beautifyDate } from "../../helpers/utility-func.js";
import PaginationBar from "../pagination-bar/pagination-bar.js";
import { getSortQueryFromLocalStorage } from "../../helpers/localStorage";
import {createFailedSearchInformation} from "../../helpers/utility-func.js";
import { locationTownSelectField, minPrice, maxPrice } from "../../dataset/";
import { filterFormSubmit,sortPropertyListing } from "../../helpers/form-handles.js";

const PageInfoTitle = ({ searchResultsQty, notFoundStr }) => 
  <h1 className="listing--title">
    {searchResultsQty == 0 ? (
      `No results to show ( ${notFoundStr} )`
    ) : (
      <Fragment>
        {searchResultsQty} {isPlural(searchResultsQty, "Property", "ies")} to
        view
      </Fragment>
    )}
  </h1>

const NotFoundImg = ({ searchResultsQty, notFoundStr }) =>
  searchResultsQty == 0 && (
    <img
      className="listing--no-result-img"
      src={"/static/images/photos/no-result.png"}
      alt="No results found"
      title={`No properties found for ${notFoundStr}`}
    />
  );

class SortForm extends Component {
  render() {
    return (
      this.props.searchResultsQty > 0 && (
        <form className="listing__sort" id="sortForm">
          <label>Sort by:</label>
          <select name="sort" onClick={sortPropertyListing}>
            <option value="latest">Latest adverts</option>
            <option value="lowest">Price (Lowest)</option>
            <option value="highest">Price (Highest)</option>
          </select>
        </form>
      )
    );
  }
  componentDidMount() {
    if (this.props.searchResultsQty > 0) {
      const sortPreference = window.location.pathname.replace(
        "/properties/",
        ""
      );
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
}

const FilterForm = () =>
  <section className="listing__filter">
    <button
      className="listing__filter--expose-filter-btn"
      onClick={() => {
        document
          .getElementById("filterForm")
          .classList.toggle("display-filter-options");
      }}
    >
      Filter
    </button>
    <form
      className="listing__filter-form default-form"
      id="filterForm"
      onSubmit={filterFormSubmit}
    >
      <div className="input-container">
        <label>Premises type</label>
        <select name="premises_type">
          <option value="house" selected>
            House
          </option>
          <option value="flat">Flat</option>
          <option value="office">Office</option>
          <option value="land">Land</option>
          <option value="building">Building</option>
        </select>
      </div>
      <div className="input-container">
        <label>Advert type</label>
        <select name="advert_type">
          <option value="sale" selected>
            For sale
          </option>
          <option value="rent">Rental</option>
        </select>
      </div>
      <div className="input-container">
        <label>Min price</label>
        <select name="minPrice">
          {minPrice.map(({ value, text }) => (
            <option value={value}>{text}</option>
          ))}
        </select>
      </div>
      <div className="input-container">
        <label>Max price</label>
        <select name="maxPrice">
          {maxPrice.map(({ value, text }) => (
            <option value={value}>{text}</option>
          ))}
        </select>
      </div>
      <div className="input-container">
        <label>Town</label>
        <select name="town">
          {locationTownSelectField.map(townObj => {
            return <option value={townObj.value}>{townObj.text}</option>;
          })}
        </select>
      </div>
      <button className="listing__filter-form-btn">Filter</button>
    </form>
  </section>

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


