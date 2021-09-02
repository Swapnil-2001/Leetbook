import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";
import { REMOVE_ID } from "../../constants/actionTypes";

const Form = () => {
  const dispatch = useDispatch();
  const idOfPost = useSelector((state) => state.editId);
  const { posts } = useSelector((state) => state.posts);
  const post = idOfPost ? posts.find((p) => idOfPost === p._id) : null;
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setPostData({ creator: "", title: "", message: "", tags: "" });
    dispatch({ type: REMOVE_ID });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (idOfPost) {
      dispatch(updatePost(idOfPost, postData));
    } else {
      dispatch(createPost(postData));
    }
    dispatch({ type: REMOVE_ID });
    clear();
  };

  return (
    <div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h3>Create a post</h3>
        <textarea
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <textarea
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <textarea
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <textarea
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <button type="submit">Submit</button>
        <button onClick={clear}>Clear</button>
      </form>
    </div>
  );
};

export default Form;
