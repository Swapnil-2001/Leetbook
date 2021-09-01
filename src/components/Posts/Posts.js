import React from "react";
import { useSelector } from "react-redux";
import BounceLoader from "react-spinners/BounceLoader";

import Post from "./Post/Post";

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  return isLoading ? (
    <BounceLoader />
  ) : (
    <div>
      Posts
      {posts.map((post) => (
        <div key={post._id} style={{ background: "lightGray" }}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
