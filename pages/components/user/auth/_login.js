import Router from "next/router";
import isValidEmail from "sane-email-validation";
import { saveUserDataToLocalStorage } from "../../../helpers/localStorage.js";
import { popupWindow } from "../../../helpers/popup.js";
import { displayLoader, removeLoader } from "../../../helpers/btn-loader.js";
import { retrieveFormValues } from "../../../helpers/utility-func.js";

const handleLoginSubmit = async e => {
  e.preventDefault();
  const values = retrieveFormValues(e.target.elements);
  if (!isValidEmail(values.email)) {
    return popupWindow("loginForm", "Please enter a valid email!");
  }
  displayLoader("#loginSubmitBtn");
  const { data } = await axios.post("/auth/user/login", values);
  removeLoader("#loginSubmitBtn");
  if (!data) {
    return popupWindow("loginForm", "Incorrect email or password!");
  }
  saveUserDataToLocalStorage(data);
  return Router.push("/user/console");
}

export default() => 
  <form
    onSubmit={handleLoginSubmit}
    id="loginForm"
    className="default-form" 
  >
  <label>Email</label>
    <input type="email" name="email" placeholder=" @" required/>
    <label>Password</label>
    <input type="password" name="password" placeholder=" Password" minLength="8" required/>
    <button
      type="submit"
      id="loginSubmitBtn"
    >
      Login
    </button>
  </form>