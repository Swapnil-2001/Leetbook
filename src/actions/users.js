import { fetchUser, editUser } from "../api";
import {
  FETCH_USER,
  START_LOADING_USER,
  STOP_LOADING_USER,
} from "../constants/actionTypes";

// getUser

export const getUser = (username) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_USER });
    const { data } = await fetchUser(username);
    dispatch({ type: FETCH_USER, payload: data });
    dispatch({ type: STOP_LOADING_USER });
  } catch (error) {
    console.log(error);
  }
};

export const editProfilePic =
  (userId, profilePic, history, username) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_USER });
      const { data } = await editUser(userId, profilePic);
      dispatch({ type: FETCH_USER, payload: data });
      history.push(`/users/${username}`);
      dispatch({ type: STOP_LOADING_USER });
    } catch (error) {
      console.log(error);
    }
  };
