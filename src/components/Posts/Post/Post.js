import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";
import { SET_ID } from "../../../constants/actionTypes";

const Post = ({ post }) => {
  const { _id, title, name, likes, message, createdAt, creator, tags } = post;
  const dispatch = useDispatch();
  const history = useHistory();
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

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <div>
      <div onClick={openPost}>
        <p>{title}</p>
        <p>{name}</p>
        <div>{message}</div>
        <span>{moment(createdAt).utc().fromNow()}</span>
        <div>{tags.map((tag) => `#${tag.trim()} `)}</div>
      </div>
      {(creator === user?.result?.googleId ||
        creator === user?.result?._id) && (
        <button
          onClick={() => {
            dispatch({ type: SET_ID, payload: _id });
            history.push("/posts/create");
          }}
        >
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
