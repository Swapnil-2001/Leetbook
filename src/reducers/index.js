import { combineReducers } from "redux";

import posts from "./posts";
import editId from "./editId";

export default combineReducers({
  posts,
  editId,
});
