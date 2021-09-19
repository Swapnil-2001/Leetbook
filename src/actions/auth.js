import * as api from "../api";
import { AUTH, SET_ERROR } from "../constants/actionTypes";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    if (!data?.message) {
      dispatch({ type: AUTH, data });
      dispatch({ type: SET_ERROR, payload: null });
      history.push("/");
    } else dispatch({ type: SET_ERROR, payload: data?.message });
  } catch (error) {
    console.log(error);
  }
};

export const signin =
  (formData, isGoogleSignIn, history) => async (dispatch) => {
    try {
      const { data } = await api.signin(formData, isGoogleSignIn);
      if (!data?.message) {
        if (isGoogleSignIn) return data;
        dispatch({ type: AUTH, data });
        dispatch({ type: SET_ERROR, payload: null });
        history.push("/");
      } else dispatch({ type: SET_ERROR, payload: data?.message });
    } catch (error) {
      console.log(error);
    }
  };
