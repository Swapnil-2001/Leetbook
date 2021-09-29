import {
  FETCH_USER,
  ADD_POSTS,
  START_LOADING_USER,
  STOP_LOADING_USER,
  START_LOADING_USER_POSTS,
  STOP_LOADING_USER_POSTS,
} from "../constants/actionTypes";

const reducer = (
  state = {
    user: null,
    userPosts: null,
    isLoading: false,
    isUserPostsLoading: false,
  },
  action
) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload };
    case ADD_POSTS:
      return { ...state, userPosts: action.payload };
    case START_LOADING_USER:
      return { ...state, isLoading: true };
    case STOP_LOADING_USER:
      return { ...state, isLoading: false };
    case START_LOADING_USER_POSTS:
      return { ...state, isUserPostsLoading: true };
    case STOP_LOADING_USER_POSTS:
      return { ...state, isUserPostsLoading: false };
    default:
      return state;
  }
};

export default reducer;
