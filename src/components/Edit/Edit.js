import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { editProfilePic } from "../../actions/users";
import useStyles from "./styles";

const Edit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [file, setFile] = useState("");
  const { isLoading } = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (!currentUser) history.push("/");
  }, [currentUser, history]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", file);
    dispatch(
      editProfilePic(
        currentUser?.result?._id,
        formData,
        history,
        currentUser?.result?.username
      )
    );
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        margin: "auto",
      }}
      onSubmit={handleSubmit}
    >
      <div>
        <label className={classes.custom__file__upload}>
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <AccountCircleIcon
            style={{ marginRight: "10px", color: "#84A9AC" }}
          />{" "}
          Change Profile Picture
        </label>
        {file && (
          <CheckCircleIcon style={{ color: "green", marginLeft: "15px" }} />
        )}
      </div>
      <Button variant="contained" color="primary" type="submit">
        Upload
      </Button>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </form>
  );
};

export default Edit;
