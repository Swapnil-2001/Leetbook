import React, { useState, useRef } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { commentPost } from "../../actions/posts";
import useStyles from "./styles";

const CommentSection = () => {
  const { post } = useSelector((state) => state.posts);
  const [comment, setComment] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = () => {
    dispatch(commentPost(user?.result?.username, comment, post._id));
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {post.comments.map((c, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              {c.username} {c.comment}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
