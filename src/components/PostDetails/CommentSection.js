import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
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
        {user?.result ? (
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
        ) : (
          <div style={{ textAlign: "center" }}>
            <h4>Please log in to comment.</h4>
          </div>
        )}
        {post?.comments.map((c, index) => (
          <div style={{ display: "flex", flexDirection: "column" }} key={index}>
            <Link
              style={{ color: "#4b6587", fontWeight: "600" }}
              to={`/users/${c.username}`}
            >
              {c.username}
            </Link>
            <span
              style={{ fontSize: "0.9rem", marginTop: "5px", color: "#6B7AA1" }}
            >
              {moment(c.createdAt).utc().fromNow()}
            </span>
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
