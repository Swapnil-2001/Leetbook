import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
    dispatch({ type: "STOP_LOADING" });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const { data } = await api.createPost(newPost);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
