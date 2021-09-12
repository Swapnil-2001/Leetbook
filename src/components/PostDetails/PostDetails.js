import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";

import { getPost } from "../../actions/posts";

const PostDetails = () => {
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

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
        </>
      )}
    </div>
  );
};

export default PostDetails;
