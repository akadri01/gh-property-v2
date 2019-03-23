import { reduxInitialState } from "../redux-initial-state.js";

export default (state = reduxInitialState.user, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        register: action.payload
      };
    case "LOGIN_USER":
      return {
        ...state,
        userData: action.payload
      };
    case "AUTH_USER":
      return {
        ...state,
        userData: action.payload
      };
    case "LOGOUT_USER":
      return {
        ...state
      };
    case "REFRESH_USER_CONSOLE":
      return {
        ...state,
        userData: action.payload
      };
    case "POST_ADVERT":
      return {
        ...state,
        userData: action.payload
      };
    case "ADJUST_NAV_FOR_LOCAL_USER":
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
};
