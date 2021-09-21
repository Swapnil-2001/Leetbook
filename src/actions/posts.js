import * as api from "../api";
import {
  START_LOADING,
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  STOP_LOADING,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
} from "../constants/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost, history) => async (dispatch) => {
  try {
    const { data } = await api.createPost(newPost);
    dispatch({ type: CREATE, payload: data });
    history.push(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedPost);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const savePost = (userId, postId) => async (dispatch) => {
  try {
    const { data } = await api.savePost(userId, postId);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (username, comment, postId) => async (dispatch) => {
  try {
    const { data } = await api.comment(username, comment, postId);
    dispatch({ type: COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
