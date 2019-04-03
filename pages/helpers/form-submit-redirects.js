import Router from "next/router";
import {
  saveNewSortQueryToLocalStorage,
  getPropertySearchQueryFromLocalStorage
} from "./localStorage.js";

export const filterFormSubmit = (filterFormSubmitEvent, query = "") => {
  filterFormSubmitEvent.preventDefault();
  // get form values
  const inputs = document.getElementById("filterForm").elements;
  const values = {};
  for (let i = 0; i < inputs.length; i++) {
    const { value, name } = inputs.item(i);
    if (value.length) {
      values[name] = value;
    }
  }
  // generate query string out of form values
  Object.keys(values).forEach(key => {
    query += `${key}=${values[key]}&`;
  });
  return Router.push(`${window.location.pathname}?${query.replace(/\&$/, "")}`);
};

export const sortPropertyListing = selectMenuClickEvent => {
  // event.target.value, available values ---> latest | lowest | highest
  const sortValue = selectMenuClickEvent.target.value;
  if (sortValue && sortValue.length) {
    // update local storage sort data
    saveNewSortQueryToLocalStorage(sortValue);
    const usefulQueries = new URLSearchParams(
      window.location.search
    ).toString();
    return Router.push(`/properties/${sortValue}?${usefulQueries}`);
  }
};

export const searchFormSubmit = (searchFormSubmitEvent, query = "") => {
  searchFormSubmitEvent.preventDefault();
  // get form values
  const inputs = document.getElementById("searchForm").elements;
  const values = {};
  for (let i = 0; i < inputs.length; i++) {
    const { value, name, checked } = inputs.item(i);
    if (value.length) {
      // seperate town and region out of location value
      if (value.includes("TOWN_")) {
        values.town = value.replace(/TOWN_/g, "");
      }
      if (value.includes("REGION_")) {
        values.region = value.replace(/REGION_/g, "");
      }
      if (!value.match(/TOWN_|REGION_/g) && checked === true) {
        values[name] = value;
      }
    }
  }
  // generate query string out of form values
  Object.keys(values).forEach(key => {
    query += `${key}=${values[key]}&`;
  });
  return Router.push(`/properties/latest?${query.replace(/\&$/, "")}`);
};
