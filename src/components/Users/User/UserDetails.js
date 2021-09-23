import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { getUser } from "../../../actions/users";
import useStyles from "./styles";

const UserDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { username } = useParams();
  const { user, isLoading } = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem("profile"));

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
        <div className={classes.wrapper__div}>
          <h1 className={classes.name}>{user.name}</h1>
          <h3 className={classes.username}>{user.username}</h3>
          <h3 className={classes.email}>{user.email}</h3>
          {currentUser?.result?._id === user._id && (
            <Link to={`/posts/saved/${user._id}`}>Saved Posts</Link>
          )}
        </div>
      )}
    </>
  );
};

export default UserDetails;
