import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";
import { SET_ID } from "../../../constants/actionTypes";
import "./Post.css";

const Post = ({
  post: { _id, title, creator, message, createdAt, likeCount },
}) => {
  const dispatch = useDispatch();
  return (
    <div className="post__div">
      <p>{title}</p>
      <p>{creator}</p>
      <div>{message}</div>
      <span>{moment(createdAt).utc().fromNow()}</span>
      <button onClick={() => dispatch({ type: SET_ID, payload: _id })}>
        Edit
      </button>
      <button onClick={() => dispatch(likePost(_id))}>Likes {likeCount}</button>
      <button onClick={() => dispatch(deletePost(_id))}>Delete</button>
    </div>
  );
};

export default Post;
