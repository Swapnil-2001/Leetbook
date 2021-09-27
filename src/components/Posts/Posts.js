import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  return isLoading ? (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <CircularProgress />
    </div>
  ) : (
    <div className={classes.mainContainer}>
      {posts.length === 0 ? (
        <h3 style={{ color: "#4b6587" }}>No posts match your search.</h3>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
