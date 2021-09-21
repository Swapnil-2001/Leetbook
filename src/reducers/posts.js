import {
  START_LOADING,
  FETCH_ALL,
  FETCH_POST,
  SET_FETCHED_POST,
  SET_SAVED_POST,
  FETCH_BY_SEARCH,
  STOP_LOADING,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
} from "../constants/actionTypes";

const reducer = (
  state = { isLoading: true, posts: [], post: null },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case SET_SAVED_POST:
      return { ...state, post: action.payload };
    case SET_FETCHED_POST:
      return {
        ...state,
        post: {
          ...state.post,
          likes: state.post.likes.includes(action.payload)
            ? state.post.likes.filter((id) => id !== action.payload)
            : [...state.post.likes, action.payload],
        },
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case CREATE:
      return { ...state, posts: [action.payload, ...state.posts] };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
        post: action.payload,
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
