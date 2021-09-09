import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Input from "./input";
import Icon from "./icon";
import { AUTH } from "../../constants/actionTypes";
import { signin, signup } from "../../actions/auth";
import "./Auth.css";

const Auth = () => {
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
  const history = useHistory();

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
      <div className="shape1" />
      <div className="shape2" />
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
    </div>
  );
};

export default Auth;
