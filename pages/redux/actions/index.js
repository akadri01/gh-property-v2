import {getUserDataFromLocalStorage} from '../../helpers/localStorage';

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
  // create arr out of features
  const featuresArr = [];
  let totalFeaturesQty = 50;
  while (--totalFeaturesQty) {
    if (formValues['features' + totalFeaturesQty] !== undefined) {
      featuresArr.push(formValues['features' + totalFeaturesQty])
    }
  }

  const formData = new FormData();
  const userData = getUserDataFromLocalStorage();

  formData.append(
    "inputValues",
    JSON.stringify({
      advert_type: formValues.advert_type,
      age: formValues.age,
      area: formValues.area,
      detail: formValues.detail,
      features: featuresArr,
      furniture: formValues.furniture,
      garden: formValues.garden,
      located_floor: formValues.located_floor,
      phone: formValues.phone,
      posted_by: formValues.posted_by,
      premises_type: formValues.premises_type,
      price: formValues.price,
      region: formValues.region,
      rooms_qty: formValues.rooms_qty,
      title: formValues.title,
      total_balcony: formValues.total_balcony,
      total_bathroom: formValues.total_bathroom,
      total_floor: formValues.total_floor,
      town: formValues.town,
      userName: userData.name,
      userId: userData._id,
      userEmail: userData.email
    }) 
  );
  // // if any image uploaded
  if (formValues.mainImage || formValues.images.length) {
    /// append images
    const allImages = [formValues.mainImg, ...formValues.images];
    allImages.forEach((singleImg, i) => {
      const imgName = "img" + i;
      formData.append(imgName, singleImg);
    });
  }
  // post form data
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

// advert_type: "sale"
// age: "3"
// area: "123"
// detail: "Competently enable world-class leadership skills through e-business e-business. "
// features5: true
// features6: true
// features7: true
// features9: true
// features14: true
// features15: true
// features16: true
// features17: true
// furniture: "no"
// garden: "yes"
// located_floor: "5"
// mainImage: File {name: "obuasi-desktop.jpg", lastModified: 1551529571618, lastModifiedDate: Sat Mar 02 2019 15:26:11 GMT+0300 (GMT+03:00), webkitRelativePath: "", size: 61240, …}
// phone: "312322202"
// posted_by: "agency"
// premises_type: "house"
// price: "120000"
// region: "greater_accra"
// rooms_qty: "2+1"
// title: "Amazing house in the heart of the town"
// total_balcony: "2"
// total_bathroom: "1"
// total_floor: "9"
// town: "kumasi"
