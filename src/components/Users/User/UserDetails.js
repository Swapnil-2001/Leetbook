import React, { useEffect } from "react";
import { CircularProgress, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import StarIcon from "@material-ui/icons/Star";

import Post from "../../Posts/Post/Post";
import { getUser } from "../../../actions/users";
import { getPostsByUser } from "../../../actions/posts";
import useStyles from "./styles";

const UserDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { username } = useParams();
  const { user, userPosts, isLoading, isUserPostsLoading } = useSelector(
    (state) => state.users
  );
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
          <div className={classes.profileImg}>
            <img src={user.profileImg} alt="User" />
          </div>
          <h1 className={classes.name}>{user.name}</h1>
          <h3 className={classes.username}>{user.username}</h3>
          <h3 className={classes.email}>{user.email}</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <span style={{ marginRight: "5px" }}>
              <StarIcon style={{ color: "#EBA83A" }} />
            </span>
            <h3 style={{ color: "#5C7AEA", paddingTop: "0" }}>
              {user.reputation}
            </h3>
          </div>
          {currentUser?.result?._id === user._id && (
            <Button
              style={{ marginTop: "30px", textTransform: "none" }}
              component={Link}
              to={`/posts/saved/${user._id}`}
              variant="outlined"
              color="primary"
              endIcon={<ChevronRightIcon />}
            >
              View Saved Posts
            </Button>
          )}
          {userPosts === null ? (
            <Button
              style={{ margin: "30px 0", textTransform: "none" }}
              onClick={() => dispatch(getPostsByUser(username))}
              variant="outlined"
              color="primary"
            >
              Load Posts by {username}
            </Button>
          ) : userPosts.length > 0 ? (
            <div style={{ margin: "40px 0", width: "70%" }}>
              {userPosts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <h3 style={{ margin: "40px 0", color: "#4b6587" }}>
              No posts by this user.
            </h3>
          )}
          {isUserPostsLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "70px",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserDetails;
