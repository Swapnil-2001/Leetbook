import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Chip } from "@material-ui/core";

import { likePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post }) => {
  const { _id, title, name, likes, createdAt, tags } = post;
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (id) => id === user?.result?.googleId || user?.result?._id
      ) ? (
        <>
          {likes.length}&nbsp;like{likes.length > 1 && "s"}
        </>
      ) : (
        <>
          {likes.length}&nbsp;like{likes.length > 1 && "s"}
        </>
      );
    }
    return <>0 likes</>;
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <div className={classes.wrapper__div}>
      <div onClick={openPost}>
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
      <button disabled={!user?.result} onClick={() => dispatch(likePost(_id))}>
        <Likes />
      </button>
    </div>
  );
};

export default Post;
