import Router from "next/router";
import { getUserDataFromLocalStorage } from "./localStorage.js";

const autenticateUser = redirectUrl => {
  const user = getUserDataFromLocalStorage();
  if (!user || !user.email) {
    return Router.push(redirectUrl);
  }
  return user;
};

export default autenticateUser;
