import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import counterReducer from './_counterReducer';
import userReducer from './_userReducer';

export default combineReducers({
  loginForm: userReducer,
  counter: counterReducer,
  form: formReducer
})
