// User Data and Auth
export const saveUserDataToLocalStorage = userDataObj => localStorage.setItem("userData", JSON.stringify(userDataObj));

export const getUserDataFromLocalStorage = () => JSON.parse(localStorage.getItem("userData"));

export const removeUserDataFromLocalStorage = () => localStorage.removeItem("userData");

// Property search querystring status
export const savePropertySearchQueryToLocalStorage = queryString => localStorage.setItem("searchQuery", queryString);

export const getPropertySearchQueryFromLocalStorage = () => localStorage.getItem("searchQuery");

// Property listing sort status
export const getSortQueryFromLocalStorage = () => {
  if (localStorage.getItem("sortProperties") === null) {
    localStorage.setItem("sortProperties", "latest");
    return "latest";
  }
  return localStorage.getItem("sortProperties");
}

export const saveNewSortQueryToLocalStorage = sortQuery => localStorage.setItem("sortProperties", sortQuery);

export const setInitialSortQueryToLocalStorage = sortQuery => localStorage.getItem("sortProperties") === null ? localStorage.setItem("sortProperties", "latest") : undefined;
