import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChipInput from "material-ui-chip-input";

import { createPost, updatePost } from "../../actions/posts";
import { REMOVE_ID } from "../../constants/actionTypes";
import "./Form.css";

const Form = () => {
  const dispatch = useDispatch();
  const idOfPost = useSelector((state) => state.editId);
  const { posts } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
  });

  const post = idOfPost ? posts.find((p) => idOfPost === p._id) : null;
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setPostData({ title: "", message: "", tags: [] });
    dispatch({ type: REMOVE_ID });
  };

  const handleAdd = (tag) =>
    setPostData({ ...postData, tags: [...postData.tags, tag.trim()] });

  const handleDelete = (tag) =>
    setPostData({ ...postData, tags: postData.tags.filter((t) => t !== tag) });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (idOfPost) {
      dispatch(updatePost(idOfPost, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    dispatch({ type: REMOVE_ID });
    clear();
  };

  return (
    <div>
      {user && (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <h3>Create a post</h3>
          <textarea
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <textarea
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <ChipInput
            style={{ margin: "10px 0" }}
            value={postData.tags}
            onAdd={handleAdd}
            onDelete={handleDelete}
            label="Add Tags"
            variant="outlined"
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={clear}>
            Clear
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
