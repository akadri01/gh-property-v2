// User Data and Auth
export const saveUserDataToLocalStorage = userDataObj => {
  localStorage.setItem("userData", JSON.stringify(userDataObj));
}
export const getUserDataFromLocalStorage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return userData;
}
export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem("userData");
}