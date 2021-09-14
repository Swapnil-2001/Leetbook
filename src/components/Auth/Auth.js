import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import Input from "./input";
import Icon from "./icon";
import { AUTH } from "../../constants/actionTypes";
import { signin, signup } from "../../actions/auth";
import "./Auth.css";

const Auth = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  useEffect(() => {
    if (user) history.push("/");
  }, [user, history]);
  const [showPassword, setShowPassword] = useState(false);
  const [signedUp, setSignedUp] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (signedUp) {
      dispatch(signin(formData, history));
    } else {
      dispatch(signup(formData, history));
    }
  };
  const handleShowPassword = () => setShowPassword((prevState) => !prevState);
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => console.log("Google Sign In Was Unsuccessful!");
  return (
    <div>
      <span>{signedUp ? "Login" : "Sign Up"}</span>
      <form onSubmit={handleSubmit}>
        {!signedUp && (
          <>
            <Input name="firstName" handleChange={handleChange} />
            <Input name="lastName" handleChange={handleChange} />
          </>
        )}
        <Input
          name="email"
          placeholder="Email"
          handleChange={handleChange}
          type="email"
        />
        <Input
          name="password"
          placeholder="Password"
          handleChange={handleChange}
          type={showPassword ? "text" : "password"}
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
