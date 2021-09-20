import * as api from "../api";
import {
  AUTH,
  SET_ERROR,
  START_LOADING_AUTH,
  STOP_LOADING_AUTH,
} from "../constants/actionTypes";

export const signup = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_AUTH });
    const { data } = await api.signup(formData);
    if (!data?.message) {
      dispatch({ type: AUTH, data });
      dispatch({ type: SET_ERROR, payload: null });
      history.push("/");
    } else dispatch({ type: SET_ERROR, payload: data?.message });
    dispatch({ type: STOP_LOADING_AUTH });
  } catch (error) {
    dispatch({ type: STOP_LOADING_AUTH });
    console.log(error);
  }
};

export const signin =
  (formData, isGoogleSignIn, history) => async (dispatch) => {
    dispatch({ type: START_LOADING_AUTH });
    try {
      const { data } = await api.signin(formData, isGoogleSignIn);
      if (!data?.message) {
        if (isGoogleSignIn) {
          dispatch({ type: STOP_LOADING_AUTH });
          return data;
        }
        dispatch({ type: AUTH, data });
        dispatch({ type: SET_ERROR, payload: null });
        history.push("/");
      } else dispatch({ type: SET_ERROR, payload: data?.message });
      dispatch({ type: STOP_LOADING_AUTH });
    } catch (error) {
      dispatch({ type: STOP_LOADING_AUTH });
      console.log(error);
    }
  };
