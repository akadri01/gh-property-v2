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

export const removeAdvert = async (url, userId, fullPath) => {
  const imgDirectory = fullPath.split("/")[0];
  try {
    const { data } = await axios.delete("/api/user/remove/advert", {
      data: {
        url,
        userId,
        imgDirectory
      }
    });
    if (data && data.name) {
      saveUserDataToLocalStorage(data);
      return data.posts;
    }
  } catch (thrown) {
    console.log(thrown.message);
  }
};

