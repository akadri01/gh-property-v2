// User Data and Auth
export function saveUserDataToLocalStorage(userDataObj) {
  localStorage.setItem("userData", JSON.stringify(userDataObj));
}
export function getUserDataFromLocalStorage() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return userData;
}
export function removeUserDataFromLocalStorage() {
  localStorage.removeItem("userData");
}