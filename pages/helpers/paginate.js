import Router from "next/router";
import { getPropertySearchQueryFromLocalStorage } from "./localStorage";

export default pageNumber => {
  // previous search query
  let activeQuery = getPropertySearchQueryFromLocalStorage();

  // remove prev page query
  const previousPageQueryIndex = activeQuery.indexOf("&page=");
  if (previousPageQueryIndex !== -1) {
    activeQuery = activeQuery.substring(0, previousPageQueryIndex);
  }

  // remove base url
  activeQuery = activeQuery.replace("/properties", "");

  // insert ? if doesn't exist
  activeQuery = activeQuery.charAt(0) !== "?" ? `?${activeQuery}` : activeQuery;

  return Router.push(`/properties${activeQuery}&page=${pageNumber}`);
};
