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

