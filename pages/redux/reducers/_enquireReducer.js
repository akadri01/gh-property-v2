export default (state = false, action) => {
  return action.type === "POST_ENQUIRE"
    ? { ...state, enquire: action.payload }
    : state;
};
