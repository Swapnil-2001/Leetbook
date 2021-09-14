import React from "react";
import { useSelector } from "react-redux";
import BounceLoader from "react-spinners/BounceLoader";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  return isLoading ? (
    <BounceLoader />
  ) : (
    <div className={classes.mainContainer}>
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
