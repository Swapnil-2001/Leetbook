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
  });

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
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
          <Input
            error={error.firstName}
            name="firstName"
            placeholder="First Name"
            handleChange={handleChange}
          />
          <Input
            error={error.lastName}
            name="lastName"
            placeholder="Last Name"
            handleChange={handleChange}
          />
          <Input
            error={error.username}
            name="username"
            placeholder="Username"
            handleChange={handleChange}
          />
          <Input
            error={error.email}
            name="email"
            placeholder="Email"
            handleChange={handleChange}
            type="email"
          />
          <Input
            error={error.password}
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
