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

// Property Search Query String
export function savePropertySearchQueryToLocalStorage(queryString) {
  localStorage.setItem("searchQuery", queryString);
}

export function getPropertySearchQueryFromLocalStorage() {
  return localStorage.getItem("searchQuery");
}
