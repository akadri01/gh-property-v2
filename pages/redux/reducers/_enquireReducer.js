import { reduxInitialState } from "../redux-initial-state.js";

export default (state = reduxInitialState.enquire, action) => {
  return action.type === "POST_ENQUIRE"
    ? { ...state, enquire: action.payload }
    : state;
};
