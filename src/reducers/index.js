import { combineReducers } from "redux";

import posts from "./posts";
import editId from "./editId";
import auth from "./auth";

export default combineReducers({
  posts,
  editId,
  auth,
});
