import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { Button, CircularProgress } from "@material-ui/core";

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

  const { error: serverError, isLoading } = useSelector((state) => state.auth);

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
    if (userData && !("message" in userData)) {
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
      <div style={{ flex: "1", marginLeft: "100px", textAlign: "center" }}>
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
          {serverError && (
            <div style={{ color: "#E63E6D", marginTop: "5px" }}>
              {serverError}
            </div>
          )}
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
          <div style={{ margin: "15px 0 30px 0" }}>
            <Link style={{ color: "#39A2DB" }} to="/reset">
              Forgot Password?
            </Link>
          </div>
          <div>
            <Button
              style={{ marginBottom: "15px" }}
              variant="outlined"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              Sign In
            </Button>
          </div>
          <GoogleLogin
            clientId="963139434793-of0u3dv1a61l8ho9r1k78uilgmv27j57.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="contained"
                color="primary"
                style={{ marginBottom: "15px" }}
              >
                Sign In With &nbsp;
                <Icon />
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <p style={{ marginBottom: "10px" }}>
            Don't have an account?{" "}
            <Link style={{ color: "#7C83FD" }} to="/signup">
              Sign Up!
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

export default Auth;
