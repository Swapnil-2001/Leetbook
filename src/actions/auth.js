import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signin =
  (formData, isGoogleSignIn, history) => async (dispatch) => {
    try {
      const { data } = await api.signin(formData, isGoogleSignIn);
      if (!isGoogleSignIn) {
        dispatch({ type: AUTH, data });
        history.push("/");
      } else return data;
    } catch (error) {
      console.log(error);
    }
  };
