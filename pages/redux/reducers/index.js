import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducer from "./_userReducer";
import propertyReducer from "./_propertyReducer.js";
import enquireReducer from "./_enquireReducer.js";

export default combineReducers({
  user: userReducer,
  property: propertyReducer,
  form: formReducer,
  enquire: enquireReducer
});
