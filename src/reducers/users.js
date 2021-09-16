import {
  FETCH_USER,
  START_LOADING_USER,
  STOP_LOADING_USER,
} from "../constants/actionTypes";

const reducer = (state = { user: null, isLoading: true }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload };
    case START_LOADING_USER:
      return { ...state, isLoading: true };
    case STOP_LOADING_USER:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
