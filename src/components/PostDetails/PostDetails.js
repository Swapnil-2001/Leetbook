import React, { useEffect } from "react";
import { CircularProgress, Fab, Chip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useParams } from "react-router-dom";

import {
  getPost,
  getPostsBySearch,
  likePost,
  deletePost,
} from "../../actions/posts";
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

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post)
      dispatch(getPostsBySearch({ search: "none", tags: post.tags.join(",") }));
  }, [post, dispatch]);

  const recommendedPosts = posts?.filter(({ _id }) => _id !== post?._id);

  if (isLoading) return <CircularProgress />;

  return (
    <>
      {post && (
        <div style={{ display: "flex", padding: "50px 70px" }}>
          <div>
            <button
              disabled={!user?.result}
              onClick={() => {
                dispatch(likePost(post._id));
                dispatch({
                  type: SET_FETCHED_POST,
                  payload: user?.result?._id,
                });
              }}
            >
              {post.likes.length} Like
            </button>
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
                  Created by {post.name}{" "}
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
                  <span
                    className={classes.icons}
                    onClick={() => {
                      dispatch(deletePost(post._id));
                      history.push("/posts");
                    }}
                  >
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
        <>
          <p>You might also like:</p>
          <div>
            {recommendedPosts.map((p) => (
              <>
                <p>{p.title}</p>
                <p>{p.name}</p>
                <div>{p.message}</div>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default PostDetails;
