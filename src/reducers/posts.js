const reducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default reducer;
