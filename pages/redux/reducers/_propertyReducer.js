import { reduxInitialState } from "../redux-initial-state.js";

export default (state = reduxInitialState.property, action) => {
  switch (action.type) {
    case "FETCH_RECENT_PROPERTIES_FOR_HOMEPAGE":
      return {
        ...state,
        recentProperties: action.payload
      };
    default:
      return state;
  }
};
