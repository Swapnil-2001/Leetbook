import { AUTH, LOGOUT, SET_ERROR } from "../constants/actionTypes";

const reducer = (state = { authData: null, error: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
