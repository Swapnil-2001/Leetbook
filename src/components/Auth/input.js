import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import useStyles from "./styles";

const UserInput = ({
  name,
  value,
  handleChange,
  placeholder,
  type,
  error,
  handleShowPassword,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.input__wrapper}>
      <TextField
        error={error ? true : false}
        helperText={error !== "" && error}
        style={{ width: "75%" }}
        name={name}
        value={value}
        label={placeholder}
        onChange={handleChange}
        type={type}
        variant="outlined"
        autoComplete="off"
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </div>
  );
};

export default UserInput;
