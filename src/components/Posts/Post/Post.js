import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Chip } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUpSharp";

import useStyles from "./styles";

const Post = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { title, name, likes, createdAt, tags } = post;
  const history = useHistory();
  const classes = useStyles();

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <div onClick={openPost} className={classes.wrapper__div}>
      <div className={classes.leftHalf}>
        <h3 className={classes.title}>{title}</h3>
        <div>
          {tags.map((tag) => (
            <Chip
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
          color={likes.includes(user?.result?._id) ? "primary" : "default"}
        />
        {likes.length}
      </div>
    </div>
  );
};

export default Post;
