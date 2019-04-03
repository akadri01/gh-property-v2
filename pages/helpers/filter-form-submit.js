/**
 **
 **  Handles filter & search form submits, process the submit and redirects the user
 **
 **/

import Router from "next/router";

export default searchFilterFormSubmitEvent => {
  searchFilterFormSubmitEvent.preventDefault();
  // get form values
  const inputs = document.getElementById("filterForm").elements;
  const values = {};
  for (let i = 0; i < inputs.length; i++) {
    const item = inputs.item(i);
    if (item.value.length) {
      values[item.name] = item.value;
    }
  }
  // generate query string out of form values
  let prevQuery = window.location.search.slice(1);
  let newQuery = "";
  Object.keys(values).forEach(key => {
    // build new query
    newQuery += `${key}=${values[key]}&`;
    // if same query already in use, remove it
    if (prevQuery.includes(key)) {
      const cleanQueryArr = [];
      prevQuery.split("&").forEach(query => {
        if (!query.includes(key)) {
          cleanQueryArr.push(query);
        }
      });
      prevQuery = cleanQueryArr.join("&");
      // remove page query if exists
      if (prevQuery.includes("&page=")) {
        prevQuery = prevQuery.slice(0, prevQuery.indexOf("&page="));
      } else if (prevQuery.includes("page=")) {
        prevQuery = prevQuery.slice(0, prevQuery.indexOf("page="));
      }
    }
  });
  // join the new query string and remove & at the end of the query
  const finalQuery = (newQuery + prevQuery).replace(/\&$/, "");
  return Router.push(`${window.location.pathname}?${finalQuery}`);
};
