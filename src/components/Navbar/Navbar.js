import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";
import useStyles from "./styles";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
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
    <div className={classes.navbar}>
      <span className={classes.navbar__logo}>
        <Link to="/">
          <h3 style={{ color: "white" }}>Leetbook</h3>
        </Link>
      </span>
      <div className={classes.login__div}>
        {user ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar style={{ backgroundColor: "#7C83FD", marginRight: "10px" }}>
              {user.result.name.charAt(0)}
            </Avatar>
            <h3 style={{ color: "white" }}>{user.result.username}</h3>
            <Button
              onClick={logout}
              variant="contained"
              color="secondary"
              style={{ margin: "0 30px" }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
              style={{ margin: "0 30px" }}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
