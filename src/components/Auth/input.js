import React from "react";
import { TextField } from "@material-ui/core";

const input = ({
  name,
  handleChange,
  placeholder,
  type,
  handleShowPassword,
}) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <TextField
        name={name}
        label={placeholder}
        onChange={handleChange}
        type={type}
      />
      {name === "password" && (
        <button type="button" onClick={handleShowPassword}>
          Toggle
        </button>
      )}
    </div>
  );
};

export default input;
