import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";
import { SET_ID } from "../../../constants/actionTypes";
import "./Post.css";

const Post = ({
  post: { _id, title, name, likes, message, createdAt, creator },
}) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (id) => id === user?.result?.googleId || user?.result?._id
      ) ? (
        <>
          {likes.length}&nbsp;like{likes.length > 1 && "s"}
        </>
      ) : (
        <>
          {likes.length}&nbsp;like{likes.length > 1 && "s"}
        </>
      );
    }
    return <>0 likes</>;
  };
  return (
    <div className="post__div">
      <p>{title}</p>
      <p>{name}</p>
      <div>{message}</div>
      <span>{moment(createdAt).utc().fromNow()}</span>
      {(creator === user?.result?.googleId ||
        creator === user?.result?._id) && (
        <button onClick={() => dispatch({ type: SET_ID, payload: _id })}>
          Edit
        </button>
      )}
      <button disabled={!user?.result} onClick={() => dispatch(likePost(_id))}>
        <Likes />
      </button>
      {(creator === user?.result?.googleId ||
        creator === user?.result?._id) && (
        <button onClick={() => dispatch(deletePost(_id))}>Delete</button>
      )}
    </div>
  );
};

export default Post;
