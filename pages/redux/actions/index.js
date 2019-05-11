import generateAdvertFormData from "../../helpers/generate-advert-formdata";
import { getUserDataFromLocalStorage } from "../../helpers/localStorage";

// USER ACTIONS
export const loginUser = formValues => async dispatch => {
  try {
    const { data } = await axios.post("/auth/user/login", formValues);
    return dispatch({
      type: "LOGIN_USER",
      payload: data
    });
  } catch (e) {
    console.log(e);
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
    console.log(e);
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
    console.log(e);
    return dispatch({
      type: "POST_ADVERT",
      payload: []
    });
  }
};

export const editAdvert = formValues => async dispatch => {
  try {
    const { data } = await axios.put("/api/user/edit/advert", formValues);
    return dispatch({
      type: "EDIT_ADVERT",
      payload: data
    });
  } catch (e) {
    console.log(e);
    return dispatch({
      type: "EDIT_ADVERT",
      payload: false
    });
  }
};

// ENQUIRE ACTION
export const postEnquire = formValues => dispatch => {
  try {
    axios.post("/api/enquire", formValues);
    return dispatch({
      type: "POST_ENQUIRE",
      payload: true
    });
  } catch (e) {
    console.log(e);
    return dispatch({
      type: "POST_ENQUIRE",
      payload: false
    });
  }
};

// PROPERTY ACTIONS
export const fetchPropertiesForHomePage = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/fetch/homepage/properties/recent");
    return dispatch({
      type: "FETCH_RECENT_PROPERTIES_FOR_HOMEPAGE",
      payload: data
    });
  } catch (e) {
    console.log(e);
    return dispatch({
      type: "FETCH_RECENT_PROPERTIES_FOR_HOMEPAGE",
      payload: []
    });
  }
};
