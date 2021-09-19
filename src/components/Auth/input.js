import React from "react";
import { TextField } from "@material-ui/core";

import useStyles from "./styles";

const UserInput = ({
  name,
  handleChange,
  placeholder,
  type,
  handleShowPassword,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.input__wrapper}>
      <TextField
        style={{ width: "25%" }}
        name={name}
        label={placeholder}
        onChange={handleChange}
        type={type}
        variant="outlined"
        autoComplete="off"
      />
      {name === "password" && (
        <button type="button" onClick={handleShowPassword}>
          Toggle
        </button>
      )}
    </div>
  );
};

export default UserInput;
