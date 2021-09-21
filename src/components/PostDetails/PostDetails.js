import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Fab,
  Button,
  Chip,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import { useParams } from "react-router-dom";

import {
  getPost,
  getPostsBySearch,
  likePost,
  deletePost,
} from "../../actions/posts";
import CommentSection from "./CommentSection";
import { SET_FETCHED_POST } from "../../constants/actionTypes";
import { SET_ID } from "../../constants/actionTypes";
import useStyles from "./styles";

const PostDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post)
      dispatch(getPostsBySearch({ search: "none", tags: post.tags.join(",") }));
  }, [post, dispatch]);

  const recommendedPosts = posts?.filter(({ _id }) => _id !== post?._id);

  if (isLoading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "70px" }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <>
      {post && (
        <div style={{ display: "flex", padding: "50px 70px 50px 30px" }}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h3>Are you sure you want to delete this post?</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: "15px" }}
                    onClick={() => setOpen(false)}
                  >
                    No
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      dispatch(deletePost(post._id));
                      setOpen(false);
                      history.push("/posts");
                    }}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </Fade>
          </Modal>
          <div>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                marginRight: "30px",
              }}
              onClick={() => {
                if (!user) history.push("/auth");
                else {
                  dispatch(likePost(post._id));
                  dispatch({
                    type: SET_FETCHED_POST,
                    payload: user?.result?._id,
                  });
                }
              }}
            >
              <ArrowDropUpIcon
                style={{
                  fontSize: 50,
                  color: post.likes.includes(user?.result?._id)
                    ? "white"
                    : "black",
                  backgroundColor: post.likes.includes(user?.result?._id)
                    ? "#4b6587"
                    : "#EFEFEF",
                  marginBottom: "10px",
                }}
              />
              {post.likes.length}
            </span>
          </div>
          <div
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              flexGrow: "100",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className={classes.header__div}>
                <h2>{post.title}</h2>
                <p>
                  Created by <Link to={`/users/${post.name}`}>{post.name}</Link>{" "}
                  {moment(post.createdAt).utc().fromNow()}
                </p>
              </div>
              {post.creator === user?.result?._id && (
                <div style={{ marginLeft: "auto" }}>
                  <span
                    className={classes.icons}
                    onClick={() => {
                      dispatch({ type: SET_ID, payload: post._id });
                      history.push("/posts/create");
                    }}
                  >
                    <Fab size="small" color="primary" aria-label="edit">
                      <EditIcon />
                    </Fab>
                  </span>
                  <span className={classes.icons} onClick={() => setOpen(true)}>
                    <Fab size="small" color="secondary" aria-label="edit">
                      <DeleteIcon />
                    </Fab>
                  </span>
                </div>
              )}
            </div>
            <hr />
            <div className={classes.content}>{post.message}</div>
            <div className={classes.content}>
              {post.tags.map((tag) => (
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
          </div>
        </div>
      )}
      {recommendedPosts.length > 0 && (
        <div className={classes.recommended__div}>
          <h3 style={{ color: "#4b6587" }}>You might also like:</h3>
          {recommendedPosts.slice(0, 6).map((p) => (
            <div
              key={p._id}
              className={classes.recommended__post}
              onClick={() => history.push(`/posts/${p._id}`)}
            >
              <h3>
                {p.title.length < 25
                  ? p.title
                  : p.title.substring(0, 25) + "..."}
              </h3>
              <p>{p.name}</p>
            </div>
          ))}
        </div>
      )}
      <CommentSection />
    </>
  );
};

export default PostDetails;
