/**
 **
 **  Handles sort filter form submit
 **
 **/

import Router from "next/router";
import {
  saveNewSortQueryToLocalStorage,
  getPropertySearchQueryFromLocalStorage
} from "./localStorage.js";

export default selectMenuClickEvent => {
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
