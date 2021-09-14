import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
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

const PostDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
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
    <div>
      {post && (
        <>
          <p>{post.title}</p>
          <p>{post.name}</p>
          <div>{post.message}</div>
          <span>{moment(post.createdAt).utc().fromNow()}</span>
          <div>{post.tags.map((tag) => `#${tag.trim()} `)}</div>
          {post.creator === user?.result?._id && (
            <button
              onClick={() => {
                dispatch({ type: SET_ID, payload: post._id });
                history.push("/posts/create");
              }}
            >
              Edit
            </button>
          )}
          <button
            disabled={!user?.result}
            onClick={() => {
              dispatch(likePost(post._id));
              dispatch({ type: SET_FETCHED_POST, payload: user?.result?._id });
            }}
          >
            {post.likes.length} Like
          </button>
          {post.creator === user?.result?._id && (
            <button
              onClick={() => {
                dispatch(deletePost(post._id));
                history.push("/posts");
              }}
            >
              Delete
            </button>
          )}
        </>
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
    </div>
  );
};

export default PostDetails;
