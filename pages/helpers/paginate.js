import Router from "next/router";
import { getPropertySearchQueryFromLocalStorage } from "./localStorage";

export default pageNumber => {
  let currentQuery = getPropertySearchQueryFromLocalStorage();

  // remove prev page query
  const previousPageQueryIndex = currentQuery.indexOf("&page=");
  if (previousPageQueryIndex !== -1) {
    currentQuery = currentQuery.substring(0, previousPageQueryIndex);
  }
  // remove base url
  currentQuery = currentQuery.replace("/properties", "");
  // insert ? if doesn't exist
  currentQuery =
    currentQuery.charAt(0) !== "?" ? `?${currentQuery}` : currentQuery;

  return Router.push(`/properties${currentQuery}&page=${pageNumber}`);
};
