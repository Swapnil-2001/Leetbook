import axios from "axios";

const API = axios.create({ baseURL: "https://leetbook.herokuapp.com" });
// const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByUser = (username) =>
  API.get(`/posts/user/${username}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&difficulty=${
      searchQuery.difficulty
    }&tags=${searchQuery.tags}`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const savePost = (userId, postId) =>
  API.patch("/posts/save", { postId, userId });
export const comment = (username, comment, postId) =>
  API.post(`/posts/${postId}/commentPost`, { username, comment });

export const signup = (formData) => API.post("/users/signup", formData);
export const signin = (formData, isGoogleSignIn) =>
  API.post("/users/signin", { formData, isGoogleSignIn });
export const fetchUser = (username) => API.get(`/users/${username}`);
export const editUser = (userId, profilePic) =>
  API.patch(`/users/${userId}`, profilePic);
