import Router from "next/router";
import { getUserDataFromLocalStorage } from "./localStorage.js";

export default redirectUrl => {
  const user = getUserDataFromLocalStorage();
  if (!user || !user.email) {
    return Router.push(redirectUrl);
  }
  return user;
};