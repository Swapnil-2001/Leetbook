import React, { useState, useEffect } from "react";
import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/auth");
    setAnchorEl(null);
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar style={{ backgroundColor: "#7C83FD" }}>
                {user.result.name.charAt(0)}
              </Avatar>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                component={Link}
                to={`/users/${user?.result?.username}`}
                className={classes.menuItem}
                onClick={handleClose}
              >
                <AccountCircleIcon
                  color="primary"
                  style={{ marginRight: "10px" }}
                />{" "}
                Profile
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <AccountBoxIcon
                  color="primary"
                  style={{ marginRight: "10px" }}
                />{" "}
                My account
              </MenuItem>
              <MenuItem
                className={`${classes.menuItem} ${classes.logout}`}
                onClick={logout}
              >
                <ExitToAppIcon style={{ marginRight: "10px" }} /> Logout
              </MenuItem>
            </Menu>
            <h3 style={{ color: "white", margin: "0 35px 0 20px" }}>
              {user.result.username}
            </h3>
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
