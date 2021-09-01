import React from "react";
import moment from "moment";

const Post = ({ post: { title, creator, message, createdAt, likeCount } }) => {
  return (
    <>
      <p>{title}</p>
      <p>{creator}</p>
      <div>{message}</div>
      <span>{moment(createdAt).fromNow()}</span>
      <button>Edit</button>
      <button>Likes {likeCount}</button>
      <button>Delete</button>
    </>
  );
};

export default Post;
