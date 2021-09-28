import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";

import Input from "./input";
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
    setFormData({ ...formData, [name]: value });
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
    const userData = new FormData();
    userData.append("profileImg", formData.profileImg);
    userData.append("firstName", formData.firstName);
    userData.append("lastName", formData.lastName);
    userData.append("username", formData.username);
    userData.append("email", formData.email);
    userData.append("password", formData.password);
    userData.append("confirmPassword", formData.confirmPassword);
    dispatch(signup(userData, history));
  };
  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <div style={{ display: "flex", textAlign: "center" }}>
      <div style={{ flex: "1", marginLeft: "75px" }}>
        <h1 className={classes.heading}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, profileImg: e.target.files[0] })
              }
            />
          </div>
          <Input
            error={error.firstName ? true : false}
            name="firstName"
            placeholder="First Name"
            handleChange={handleChange}
          />
          <Input
            error={error.lastName ? true : false}
            name="lastName"
            placeholder="Last Name"
            handleChange={handleChange}
          />
          <Input
            error={error.username ? true : false}
            name="username"
            placeholder="Username"
            handleChange={handleChange}
          />
          <Input
            error={error.email ? true : false}
            name="email"
            placeholder="Email"
            handleChange={handleChange}
            type="email"
          />
          <Input
            error={error.password ? true : false}
            name="password"
            placeholder="Password"
            handleChange={handleChange}
            type={showPassword ? "text" : "password"}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
          />
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            handleChange={handleChange}
            type="password"
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
