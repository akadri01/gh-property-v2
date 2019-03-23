import generateAdvertFormData from "../../helpers/generate-advert-formdata";
import { getUserDataFromLocalStorage } from "../../helpers/localStorage";

export const adjustNavForLocalUser = () => dispatch => {
  const user = getUserDataFromLocalStorage();
  return dispatch({
    type: "ADJUST_NAV_FOR_LOCAL_USER",
    payload: user
  });
};

export const loginUser = formValues => async dispatch => {
  try {
    const { data } = await axios.post("/auth/user/login", formValues);
    return dispatch({
      type: "LOGIN_USER",
      payload: data
    });
  } catch (e) {
    return dispatch({
      type: "LOGIN_USER",
      payload: []
    });
  }
};

export const registerUser = formValues => async dispatch => {
  try {
    const { data } = await axios.post("/auth/user/register", formValues);
    return dispatch({
      type: "REGISTER_USER",
      payload: data
    });
  } catch (e) {
    return dispatch({
      type: "REGISTER_USER",
      payload: []
    });
  }
};

export const refreshUserConsole = userData => dispatch => {
  return dispatch({
    type: "REFRESH_USER_CONSOLE",
    payload: userData
  });
};

export const postAdvert = formValues => async dispatch => {
  try {
    const formData = generateAdvertFormData(formValues);
    const { data } = await axios.post("/api/user/create/advert", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return dispatch({
      type: "POST_ADVERT",
      payload: data
    });
  } catch (e) {
    return dispatch({
      type: "POST_ADVERT",
      payload: []
    });
  }
};
