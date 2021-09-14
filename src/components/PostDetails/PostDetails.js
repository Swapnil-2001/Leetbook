import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
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
