import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getUser } from "../../../actions/users";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { user, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUser(username));
  }, [dispatch, username]);

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
      {user && (
        <div>
          {user.username} {user.email}
          {user?.savedPosts?.map((postId) => (
            <div key={postId}>{postId}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserDetails;
