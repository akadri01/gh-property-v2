export default (state = [], action) => {
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
