export default (state = [], action) => {
  switch (action.type) {
<<<<<<< HEAD
    case "REGISTER_USER":
      return {
        ...state,
        register: action.payload
      };
=======
>>>>>>> remove-redux
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
