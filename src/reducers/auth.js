import {
  AUTH,
  LOGOUT,
  SET_ERROR,
  START_LOADING_AUTH,
  STOP_LOADING_AUTH,
} from "../constants/actionTypes";

const reducer = (
  state = { authData: null, error: null, isLoading: false },
  action
) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case START_LOADING_AUTH:
      return { ...state, isLoading: true };
    case STOP_LOADING_AUTH:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
