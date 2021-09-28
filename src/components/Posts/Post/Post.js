import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Chip } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUpSharp";

import useStyles from "./styles";

const Post = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { title, name, likes, createdAt, difficulty, tags } = post;
  const history = useHistory();
  const classes = useStyles();

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <div onClick={openPost} className={classes.wrapper__div}>
      <div className={classes.leftHalf}>
        <div className={classes.title}>
          <h3>{title.length < 75 ? title : title.substring(0, 75) + "..."}</h3>
          <span
            style={{
              marginLeft: "25px",
              borderRadius: "10px",
              padding: "3px 10px",
              backgroundColor:
                difficulty === "easy"
                  ? "#38A3A5"
                  : difficulty === "medium"
                  ? "orange"
                  : "#911F27",
              color: "white",
            }}
          >
            {difficulty}
          </span>
        </div>
        <div>
          {tags.map((tag) => (
            <Chip
              key={tag}
              style={{ borderRadius: "5px", marginRight: "10px" }}
              label={tag.trim()}
              clickable
              color="primary"
              variant="outlined"
            />
          ))}
        </div>
        <p className={classes.footer}>
          Created by {name} {moment(createdAt).utc().fromNow()}
        </p>
      </div>
      <div className={classes.rightHalf}>
        <ArrowDropUpIcon
          style={{ fontSize: 50 }}
          color={likes.includes(user?.result?._id) ? "primary" : "inherit"}
        />
        {likes.length}
      </div>
    </div>
  );
};

export default Post;
