import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ChatIcon from "@material-ui/icons/Chat";

import { commentPost } from "../../actions/posts";
import useStyles from "./styles";

const CommentSection = () => {
  const { post } = useSelector((state) => state.posts);
  const [comment, setComment] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = () => {
    dispatch(commentPost(user?.result?.username, comment, post._id));
    setComment("");
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <ChatIcon style={{ marginRight: "10px" }} />
          <h3>Comments:</h3>
        </div>
        {user?.result && (
          <div
            style={{
              margin: "0 30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              rows={2}
              variant="outlined"
              style={{
                backgroundColor: "white",
              }}
              label="Write a comment"
              multiline
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              style={{ margin: "20px 0" }}
              color="primary"
              size="small"
            >
              Comment
            </Button>
          </div>
        )}
        {post?.comments.map((c, index) => (
          <div style={{ display: "flex", flexDirection: "column" }} key={index}>
            <h4>{c.username}</h4>
            <span style={{ margin: "5px 0 10px 10px", fontSize: "0.95rem" }}>
              {c.comment}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
