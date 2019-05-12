export default (state = [], action) => {
  switch (action.type) {
    case "AUTH_USER":
      return {
        ...state,
        userData: action.payload
      };
    case "LOGOUT_USER":
      return {
        ...state
      };
    case "POST_ADVERT":
      return {
        ...state,
        userData: action.payload
      };
    case "EDIT_ADVERT":
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
};
