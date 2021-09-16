import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Chip,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";

import { createPost, updatePost } from "../../actions/posts";
import { menuItems } from "./menuItems";
import { REMOVE_ID } from "../../constants/actionTypes";
import useStyles from "./styles";

const Form = () => {
  const [selected, setSelected] = useState(
    new Array(menuItems.length).fill(false)
  );
  const [error, setError] = useState({
    title: "",
    message: "",
  });
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
    difficulty: "",
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
    setPostData({ title: "", message: "", difficulty: "", tags: [] });
    setSelected(new Array(menuItems.length).fill(false));
  };

  const handleAdd = (tag) =>
    setPostData({ ...postData, tags: [...postData.tags, tag.trim()] });

  const handleDelete = (tag) =>
    setPostData({ ...postData, tags: postData.tags.filter((t) => t !== tag) });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!postData.title.trim() || !postData.message.trim()) {
      if (!postData.title.trim())
        setError((prevState) => ({
          ...prevState,
          title: "Title cannot be empty.",
        }));
      if (!postData.message.trim())
        setError((prevState) => ({
          ...prevState,
          message: "Message cannot be empty.",
        }));
      return;
    }

    if (idOfPost) {
      dispatch(
        updatePost(idOfPost, { ...postData, name: user?.result?.username })
      );
      dispatch({ type: REMOVE_ID });
      history.push(`/posts/${idOfPost}`);
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.username }));
      history.push("/");
    }
    clear();
  };

  return (
    <div className={classes.create__post__div}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2>{idOfPost ? "Edit" : "Create"} a Post</h2>
        <TextField
          name="title"
          error={error.title}
          style={{ marginTop: "50px", width: "70%" }}
          helperText={error.title !== "" && error.title}
          variant="outlined"
          label="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          error={error.message}
          style={{ marginTop: "25px", width: "70%" }}
          helperText={error.message !== "" && error.message}
          variant="outlined"
          label="Content"
          multiline
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <FormControl style={{ marginTop: "20px" }} component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={postData.difficulty}
            onChange={(event) =>
              setPostData((prev) => ({
                ...prev,
                difficulty: event.target.value,
              }))
            }
            row
          >
            <FormControlLabel
              style={{ color: "#38A3A5" }}
              value="easy"
              control={<Radio />}
              label="Easy"
            />
            <FormControlLabel
              style={{ color: "#FFAA4C" }}
              value="medium"
              control={<Radio />}
              label="Medium"
            />
            <FormControlLabel
              style={{ color: "#B61919" }}
              value="hard"
              control={<Radio />}
              label="Hard"
            />
          </RadioGroup>
        </FormControl>
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
        <div className={classes.tagsDiv}>
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
              variant={selected[index] ? "default" : "outlined"}
              color="primary"
              style={{ margin: "20px 5px 0 5px" }}
            />
          ))}
        </div>
        <Button
          className={classes.button}
          style={{ fontWeight: "600" }}
          variant="contained"
          type="button"
          onClick={clear}
          endIcon={<ClearIcon />}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          type="submit"
          endIcon={<SendIcon />}
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default Form;
