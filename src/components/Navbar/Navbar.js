import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="navbar">
      <span className="navbar__logo">
        <Link to="/">
          <h3 style={{ color: "white" }}>Leetbook</h3>
        </Link>
      </span>
      <div className="login__div">
        {user ? (
          <div>
            <Avatar style={{ backgroundColor: "#7C83FD" }}>
              {user.result.name.charAt(0)}
            </Avatar>
            <h3 style={{ color: "white" }}>{user.result.name}</h3>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/auth">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
