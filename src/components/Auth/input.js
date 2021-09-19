import React from "react";
import { TextField } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import useStyles from "./styles";

const UserInput = ({
  name,
  handleChange,
  placeholder,
  type,
  error,
  showPassword,
  handleShowPassword,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.input__wrapper}>
      <TextField
        error={error}
        helperText={error !== "" && error}
        style={{ width: "75%" }}
        name={name}
        label={placeholder}
        onChange={handleChange}
        type={type}
        variant="outlined"
        autoComplete="off"
      />
      {name === "password" &&
        (showPassword ? (
          <VisibilityOffIcon
            style={{ cursor: "pointer", marginLeft: "15px" }}
            onClick={handleShowPassword}
            fontSize="large"
          />
        ) : (
          <VisibilityIcon
            style={{ cursor: "pointer", marginLeft: "15px" }}
            onClick={handleShowPassword}
            fontSize="large"
          />
        ))}
    </div>
  );
};

export default UserInput;
