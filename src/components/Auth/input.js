import React from "react";

const input = ({
  name,
  handleChange,
  placeholder,
  type,
  handleShowPassword,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <input
        name={name}
        placeholder={placeholder}
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
