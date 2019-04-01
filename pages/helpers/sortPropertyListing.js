import Router from "next/router";
import {
  saveNewSortQueryToLocalStorage,
  getPropertySearchQueryFromLocalStorage
} from "./localStorage.js";

export default sortSelectMenuClickEvent => {
  // event.target.value, possible values ---> latest | lowest | highest
  const sortValue = sortSelectMenuClickEvent.target.value;
  if (sortValue && sortValue.length) {
    // update local storage sort data
    saveNewSortQueryToLocalStorage(sortValue);
    // get current filter preferences
    const currentUrl = getPropertySearchQueryFromLocalStorage();
    const isSortedBefore = currentUrl.includes("?sort=");
    // if user sorts first time, insert sort params
    if (!isSortedBefore) {
      const newUrl = currentUrl.replace("/properties?", "");
      return Router.push(`/properties?sort=${sortValue}&${newUrl}`);
    } else {
      // user sorted before, remove the old sort query and insert new sort params
      const indexOfSortParam = currentUrl.indexOf(`est&`) + 4;
      const usefulQueries = currentUrl.substring(
        indexOfSortParam,
        currentUrl.length
      );
      return Router.push(`/properties?sort=${sortValue}&${usefulQueries}`);
    }
  }
};
