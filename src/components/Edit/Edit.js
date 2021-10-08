import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { editProfilePic } from "../../actions/users";
import { getBase64 } from "../../utils/base64";
import useStyles from "./styles";

const Edit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [file, setFile] = useState({ profileImg: "" });
  const { isLoading } = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (!currentUser) history.push("/");
  }, [currentUser, history]);

  const handleFileUpload = async (e) => {
    let file = e.target.files[0];
    try {
      let result = await getBase64(file);
      setFile({ profileImg: result });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editProfilePic(
        currentUser?.result?._id,
        file,
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
            style={{ display: "none" }}
            accept=".jpg,.jpeg,.png"
            onChange={handleFileUpload}
          />
          <AccountCircleIcon
            style={{ marginRight: "10px", color: "#84A9AC" }}
          />{" "}
          Change Profile Picture
        </label>
        {file.profileImg && (
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
