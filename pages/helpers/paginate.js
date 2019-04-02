/**
 **
 **  Provides last sequence of pagination
 **
 **  Utility function for /pages/component/pagination-bar/pagination-bar.js
 **
 **/

import Router from "next/router";
import {
  getPropertySearchQueryFromLocalStorage,
  getSortQueryFromLocalStorage
} from "./localStorage";

export default pageNumber => {
  const sortValue = getSortQueryFromLocalStorage();
  let currentQuery = getPropertySearchQueryFromLocalStorage();

  // remove prev page query
  const previousPageQueryIndex = currentQuery.indexOf("&page=");
  if (previousPageQueryIndex !== -1) {
    currentQuery = currentQuery.substring(0, previousPageQueryIndex);
  }

  // remove base url
  currentQuery = currentQuery.replace(window.location.pathname, "");
  // remove ? if exist
  currentQuery =
    currentQuery.charAt(0) === "?" ? currentQuery.substring(1) : currentQuery;

  return Router.push(
    `/properties/${sortValue}?${currentQuery}&page=${pageNumber}`
  );
};
