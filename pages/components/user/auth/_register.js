import Router from "next/router";
import isValidEmail from "sane-email-validation";
import { saveUserDataToLocalStorage } from "../../../helpers/localStorage.js";
import { popupWindow } from "../../../helpers/popup.js";
import { retrieveFormValues } from "../../../helpers/utility-func.js";
import { displayLoader, removeLoader } from "../../../helpers/btn-loader.js";

const registerUser = async e => {
  e.preventDefault();
  const values = retrieveFormValues(e.target.elements);
  if (!isValidEmail(values.email)) {
    return popupWindow("registerForm", "Please enter a valid email!");
  }
  if (values.password !== values.passwordRepeat) {
    return popupWindow("registerForm", "Passwords don't match!");
  }
  displayLoader("#registerSubmitBtn");
  const { data } = await axios.post("/auth/user/register", values);
  removeLoader("#registerSubmitBtn");
  if (data._id) {
    saveUserDataToLocalStorage(data);
    return Router.push("/user/console");
  }
  if (data.dublicate) {
    return popupWindow("registerForm", "You are already registered!");
  }
  return popupWindow(
    "registerForm",
    "Due to a technical issue, we are not able to accept new members, please try again later."
  );
};

export default() => 
  <form
    onSubmit={registerUser}
    id="registerForm"
    className="default-form"
  >
    <div className="register-form-flex">
      <label>Full name</label>
      <input type="text" name="name" placeholder=" Name" minLength="3" maxLength="90" required />
    </div>
    <div className="register-form-flex">
      <label>Email</label>
      <input type="email" name="email" placeholder=" @" required />
    </div>
    <div className="register-form-flex">
      <label>Password</label>
      <input type="password" name="password" placeholder=" Password" minLength="8" maxLength="100" required />
    </div>
    <div className="register-form-flex">
      <label> Confirm password</label>
      <input type="password" name="passwordRepeat" placeholder=" Confirm password" minLength="8" maxLength="100" required />
    </div>
    <button
      type="submit"
      id="registerSubmitBtn"
    >
      Register
    </button>
  </form>
