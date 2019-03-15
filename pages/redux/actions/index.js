import generateAdvertFormData from '../../helpers/generate-advert-formdata';

export const incrementCount = () => dispatch => {
  return dispatch({ type: 'INCREMENT' })
}

export const decrementCount = () => dispatch => {
  return dispatch({ type: 'DECREMENT' })
}

export const loginUser = formValues => async dispatch => {
  const {data} = await axios.post("/auth/user/login", formValues);
  return dispatch({
    type: 'LOGIN_USER',
    payload: data
  });
};

export const registerUser = formValues => async dispatch => {
  const {data} = await axios.post("/auth/user/register", formValues);
  return dispatch({
    type: 'REGISTER_USER',
    payload: data
  });
};

export const refreshUserConsole = userData => dispatch => {
  return dispatch({
    type: 'REFRESH_USER_CONSOLE',
    payload: userData 
  });
};

export const postAdvert = formValues => async dispatch => {
  console.log(formValues)
  alert(JSON.stringify(formValues))
  const formData = generateAdvertFormData(formValues);
  const {data} = await axios.post("/api/user/create/advert", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return dispatch({
    type: 'POST_ADVERT',
    payload: data
  });
};
