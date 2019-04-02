/**
 **
 **  Handles all local storage operations
 **
 **/

// User Data and Auth
export const saveUserDataToLocalStorage = userDataObj => {
  localStorage.setItem("userData", JSON.stringify(userDataObj));
};
export const getUserDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("userData"));
};
export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem("userData");
};

// Property search querystring status
export function savePropertySearchQueryToLocalStorage(queryString) {
  localStorage.setItem("searchQuery", queryString);
}
export function getPropertySearchQueryFromLocalStorage() {
  return localStorage.getItem("searchQuery");
}

// Property listing sort status
export function getSortQueryFromLocalStorage() {
  if (localStorage.getItem("sortProperties") === null) {
    localStorage.setItem("sortProperties", "latest");
    return "latest";
  }
  return localStorage.getItem("sortProperties");
}
export function saveNewSortQueryToLocalStorage(sortQuery) {
  localStorage.setItem("sortProperties", sortQuery);
}
export function setInitialSortQueryToLocalStorage(sortQuery) {
  if (localStorage.getItem("sortProperties") === null) {
    localStorage.setItem("sortProperties", "latest");
  }
}
