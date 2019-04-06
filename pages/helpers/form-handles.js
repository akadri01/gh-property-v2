import Router from "next/router";
import {
  saveNewSortQueryToLocalStorage,
  getPropertySearchQueryFromLocalStorage,
  saveUserDataToLocalStorage
} from "./localStorage.js";
import { popupWindow } from "./popup.js";

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

export const removeAdvert = (event, url, userId, fullPath) => {
  event.preventDefault();
  const imgDirectory = fullPath.split("/")[0];
  axios
    .delete("/api/user/remove/advert", {
      data: {
        url,
        userId,
        imgDirectory
      }
    })
    .then(({ data }) => {
      if (data && data.name) {
        saveUserDataToLocalStorage(data);
        popupWindow(undefined, "Post is removed!");
        setTimeout(() => {
          Router.push(window.location.pathname);
        }, 3500);
      } else {
        popupWindow(
          undefined,
          "Due to a technical issue, we are not able to remove your post, please try again later."
        );
      }
    })
    .catch(thrown => {
      console.log(thrown.message);
      popupWindow(
        undefined,
        "Due to a technical issue, we are not able to remove your post, please try again later."
      );
    });
};