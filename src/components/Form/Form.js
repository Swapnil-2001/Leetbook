import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TextField, Chip } from "@material-ui/core";

import { createPost, updatePost } from "../../actions/posts";
import { menuItems } from "./menuItems";
import { REMOVE_ID } from "../../constants/actionTypes";
import useStyles from "./styles";

const Form = () => {
  const [selected, setSelected] = useState(
    new Array(menuItems.length).fill(false)
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const idOfPost = useSelector((state) => state.editId);
  const { posts } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (!user) history.push("/auth");
  }, [user, history]);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
  });

  const post = idOfPost ? posts.find((p) => idOfPost === p._id) : null;
  useEffect(() => {
    if (post) {
      setPostData(post);
      setSelected((prevState) =>
        prevState.map((_, index) => post.tags.includes(menuItems[index]))
      );
    }
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
    history.push("/");
  };

  return (
    <div className={classes.create__post__div}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <h3>Create a post</h3>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Content"
          multiline
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        {/* <div>
          <Button
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Tags Available
          </Button>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {menuItems.map((item, index) => (
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  handleAdd(menuItems[index]);
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
          <ChipInput
            style={{ margin: "10px" }}
            value={postData.tags}
            onAdd={handleAdd}
            onDelete={handleDelete}
            label="Add Tags"
            variant="outlined"
          />
        </div> */}
        <div style={{ display: "flex" }}>
          {menuItems.map((item, index) => (
            <Chip
              label={item}
              clickable
              onClick={() => {
                if (selected[index]) handleDelete(item);
                else handleAdd(item);
                setSelected(
                  selected.map((value, ind) => (ind === index ? !value : value))
                );
              }}
              color={selected[index] ? "primary" : "secondary"}
            />
          ))}
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default Form;
