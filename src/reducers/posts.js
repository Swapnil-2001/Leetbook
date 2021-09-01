const reducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "STOP_LOADING":
      return { ...state, isLoading: false };
    case "FETCH_ALL":
      return { ...state, posts: action.payload };
    case "CREATE":
      return { ...state, posts: [action.payload, ...state.posts] };
    default:
      return state;
  }
};

export default reducer;
