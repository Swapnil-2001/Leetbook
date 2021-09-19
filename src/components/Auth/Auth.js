import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import Input from "./input";
import { signin, signup } from "../../actions/auth";
import Icon from "./icon";
import useStyles from "./styles";
import { AUTH } from "../../constants/actionTypes";

const Auth = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    if (user) history.push("/");
  }, [user, history]);
  const [showPassword, setShowPassword] = useState(false);
  const [signedUp, setSignedUp] = useState(true);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    if (!formData.email.trim()) {
      setError((prev) => ({ ...prev, email: "Email should not be empty" }));
      valid = false;
    }
    if (!formData.password.trim()) {
      setError((prev) => ({
        ...prev,
        password: "Password should not be empty",
      }));
      valid = false;
    }
    if (!valid) return;
    if (signedUp) {
      dispatch(signin(formData, false, history));
    } else {
      if (!formData.firstName.trim()) {
        setError((prev) => ({
          ...prev,
          firstName: "First name should not be empty",
        }));
        valid = false;
      }
      if (!formData.lastName.trim()) {
        setError((prev) => ({
          ...prev,
          lastName: "Last name should not be empty",
        }));
        valid = false;
      }
      if (!formData.username.trim()) {
        setError((prev) => ({
          ...prev,
          username: "Username should not be empty",
        }));
        valid = false;
      }
      if (!valid) return;
      dispatch(signup(formData, history));
    }
  };
  const handleShowPassword = () => setShowPassword((prevState) => !prevState);
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const userData = await dispatch(
      signin({ email: result.email, password: "" }, true, history)
    );
    if (userData.message === "Sign in.") {
      dispatch({
        type: AUTH,
        data: { result: userData.result, token: userData.token },
      });
      history.push("/");
    }
  };
  const googleFailure = () => console.log("Google Sign In Was Unsuccessful!");
  return (
    <div style={{ marginLeft: "100px" }}>
      <h1 className={classes.heading}>{signedUp ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        {!signedUp && (
          <>
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
          </>
        )}
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
        {!signedUp && (
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            handleChange={handleChange}
            type="password"
          />
        )}
        <GoogleLogin
          clientId="963139434793-of0u3dv1a61l8ho9r1k78uilgmv27j57.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <Icon />
              Sign In With Google
            </button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
        <button type="submit">{signedUp ? "Sign In" : "Sign Up"}</button>
        {signedUp && (
          <p>
            Don't have an account?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setSignedUp(false)}
            >
              Sign up!
            </span>
          </p>
        )}
        {!signedUp && (
          <p>
            Have an account?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setSignedUp(true)}
            >
              Login!
            </span>
          </p>
        )}
      </form>
      <Link to="/reset">Forgot Password?</Link>
    </div>
  );
};

export default Auth;
