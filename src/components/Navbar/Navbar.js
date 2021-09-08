import React, { useState, useEffect } from "react";
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
        <h3>Leetbook</h3>
      </span>
      <div className="login__div">
        {user ? (
          <div>
            <img alt={user.result.name} src={user.result.imageUrl} />
            <h6>{user.result.name}</h6>
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
