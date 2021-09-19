import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import Input from "./input";
import { signin } from "../../actions/auth";
import resume from "../../images/Resume.jpg";
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
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
    dispatch(signin(formData, false, history));
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
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1", marginLeft: "100px" }}>
        <h1 className={classes.heading}>Login</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Sign In</button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up!</Link>
          </p>
        </form>
        <Link to="/reset">Forgot Password?</Link>
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

export default Auth;
