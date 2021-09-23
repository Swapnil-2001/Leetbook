import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Post from "../Posts/Post/Post";

const SavedPosts = () => {
  const { id } = useParams();
  const history = useHistory();
  const { user } = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (!user || currentUser?.result?._id !== id) history.push("/");
  }, [user, currentUser, id, history]);
  return (
    <div style={{ margin: "40px 75px" }}>
      <h2 style={{ marginBottom: "20px", color: "#5C7AEA" }}>
        Your Saved Posts
      </h2>
      {user?.savedPosts.length === 0 && (
        <h3 style={{ color: "#4b6587" }}>You have not saved any posts!</h3>
      )}
      {user?.savedPosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default SavedPosts;
