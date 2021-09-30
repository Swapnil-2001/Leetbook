import React, { useState, useEffect } from "react";
import { CircularProgress, Fab, Chip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { useParams } from "react-router-dom";

import {
  getPost,
  savePost,
  getPostsBySearch,
  likePost,
} from "../../actions/posts";
import DeleteModal from "./DeleteModal";
import CommentSection from "./CommentSection";
import { SET_FETCHED_POST } from "../../constants/actionTypes";
import { SET_ID } from "../../constants/actionTypes";
import useStyles from "./styles";

const PostDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  let markup;
  if (post?.message) {
    markup = draftToHtml(JSON.parse(post.message));
  }
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
      dispatch(
        getPostsBySearch({
          search: "none",
          difficulty: "all",
          tags: post.tags.join(","),
        })
      );
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
          <DeleteModal open={open} setOpen={setOpen} postId={post?._id} />
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
                <div className={classes.title}>
                  <h2>{post.title}</h2>
                  <span
                    style={{
                      marginLeft: "25px",
                      borderRadius: "10px",
                      padding: "3px 10px",
                      backgroundColor:
                        post.difficulty === "easy"
                          ? "#38A3A5"
                          : post.difficulty === "medium"
                          ? "orange"
                          : "#911F27",
                      color: "white",
                    }}
                  >
                    {post.difficulty}
                  </span>
                </div>
                <p>
                  Created by <Link to={`/users/${post.name}`}>{post.name}</Link>{" "}
                  {moment(post.createdAt).utc().fromNow()}
                </p>
              </div>
              {post.creator === user?.result?._id ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                >
                  <span
                    style={{ marginLeft: "30px" }}
                    className={classes.icons}
                  >
                    <WhatsappShareButton
                      title={`Check out this cool post created by ${post.name}!`}
                      separator="   "
                      url={window.location.href}
                    >
                      <WhatsappIcon size={32} round={true}></WhatsappIcon>
                    </WhatsappShareButton>
                  </span>
                  <span
                    className={classes.icons}
                    onClick={() => {
                      dispatch(savePost(user?.result?._id, post._id));
                    }}
                  >
                    {post?.usersWhoSaved?.includes(user?.result?._id) ? (
                      <BookmarkIcon
                        color="primary"
                        style={{ cursor: "pointer", fontSize: 35 }}
                      />
                    ) : (
                      <BookmarkBorderIcon
                        color="primary"
                        style={{ cursor: "pointer", fontSize: 35 }}
                      />
                    )}
                  </span>
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
              ) : (
                <div style={{ display: "flex", marginLeft: "auto" }}>
                  <span style={{ margin: "0 20px 0 30px" }}>
                    <WhatsappShareButton
                      title={`Check out this cool post created by ${post.name}!`}
                      separator="   "
                      url={window.location.href}
                    >
                      <WhatsappIcon size={32} round={true}></WhatsappIcon>
                    </WhatsappShareButton>
                  </span>
                  {user?.result && (
                    <span
                      className={classes.icons}
                      onClick={() => {
                        dispatch(savePost(user?.result?._id, post._id));
                      }}
                    >
                      {post?.usersWhoSaved?.includes(user?.result?._id) ? (
                        <BookmarkIcon
                          color="primary"
                          style={{ cursor: "pointer", fontSize: 35 }}
                        />
                      ) : (
                        <BookmarkBorderIcon
                          color="primary"
                          style={{ cursor: "pointer", fontSize: 35 }}
                        />
                      )}
                    </span>
                  )}
                </div>
              )}
            </div>
            <hr />
            {markup && (
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(markup) }}
              />
            )}
            <div style={{ padding: "25px 50px", paddingTop: "0" }}>
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
