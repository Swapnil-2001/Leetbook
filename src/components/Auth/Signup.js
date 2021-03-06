import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import Input from "./input";
import { getBase64 } from "../../utils/base64";
import { signup } from "../../actions/auth";
import resume from "../../images/Resume.jpg";
import useStyles from "./styles";

const Signup = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    if (user) history.push("/");
  }, [user, history]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    profileImg: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    profileImg: "",
  });

  const dispatch = useDispatch();

  const { error: serverError, isLoading } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "username" ? value.substring(0, 8) : value,
    });
  };

  const handleFileUpload = async (e) => {
    let file = e.target.files[0];
    try {
      let result = await getBase64(file);
      setFormData({ ...formData, profileImg: result });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    Object.keys(formData).forEach((key) => {
      if (key !== "profileImg" && !formData[key].trim()) {
        setError((prev) => ({ ...prev, [key]: "Should not be empty." }));
        valid = false;
      }
    });
    if (!valid) return;
    dispatch(signup(formData, history));
  };
  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <div style={{ display: "flex", textAlign: "center" }}>
      <div style={{ flex: "1", marginLeft: "75px" }}>
        <h1 className={classes.heading}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* <div className={classes.file__div}>
            <label className={classes.custom__file__upload}>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) =>
                  setFormData({ ...formData, profileImg: e.target.files[0] })
                }
              />
              <CloudUploadIcon
                style={{ marginRight: "10px", color: "#84A9AC" }}
              />{" "}
              Profile Picture
            </label>
            {formData.profileImg && (
              <CheckCircleIcon style={{ color: "green", marginLeft: "15px" }} />
            )}
          </div> */}
          <div className={classes.file__div}>
            <label className={classes.custom__file__upload}>
              <input
                type="file"
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <CloudUploadIcon
                style={{ marginRight: "10px", color: "#84A9AC" }}
              />{" "}
              Profile Picture
            </label>
            {formData.profileImg && (
              <CheckCircleIcon style={{ color: "green", marginLeft: "15px" }} />
            )}
          </div>
          <Input
            error={error.firstName ? true : false}
            value={formData.firstName}
            name="firstName"
            placeholder="First Name"
            handleChange={handleChange}
            autoComplete="off"
          />
          <Input
            error={error.lastName ? true : false}
            value={formData.lastName}
            name="lastName"
            placeholder="Last Name"
            handleChange={handleChange}
            autoComplete="off"
          />
          <Input
            error={error.username ? true : false}
            value={formData.username}
            name="username"
            placeholder="Username (Upto 8 characters)"
            handleChange={handleChange}
            autoComplete="off"
          />
          <Input
            error={error.email ? true : false}
            value={formData.email}
            name="email"
            placeholder="Email"
            handleChange={handleChange}
            type="email"
            autoComplete="off"
          />
          <Input
            error={error.password ? true : false}
            name="password"
            value={formData.password}
            placeholder="Password"
            handleChange={handleChange}
            type={showPassword ? "text" : "password"}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            autoComplete="off"
          />
          <Input
            value={formData.confirmPassword}
            name="confirmPassword"
            placeholder="Confirm Password"
            handleChange={handleChange}
            type="password"
            autoComplete="off"
          />
          {isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <CircularProgress />
            </div>
          )}
          {serverError && (
            <div style={{ color: "#E63E6D", marginTop: "5px" }}>
              {serverError}
            </div>
          )}
          <Button
            style={{ marginTop: "30px", marginBottom: "15px" }}
            variant="outlined"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            Sign Up
          </Button>
          <p>
            Have an account?{" "}
            <Link style={{ color: "#7C83FD" }} to="/auth">
              Login!
            </Link>
          </p>
        </form>
      </div>
      <div className={classes.right__div}>
        <h1 className={classes.right__div__text}>
          Grind Leetcode. Add questions you liked. Include insights into your
          solutions. Ace those interviews.
        </h1>
        <img src={resume} alt="Resume with candidate" />
      </div>
    </div>
  );
};

export default Signup;
