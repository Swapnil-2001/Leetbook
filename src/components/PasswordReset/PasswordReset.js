import axios from "axios";
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/users/resetPassword",
        { email: email.trim() }
      );
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        style={{ display: "flex", justifyContent: "center", margin: "75px 0" }}
        onSubmit={handleSubmit}
      >
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          size="small"
          label="Email"
          variant="outlined"
          autoComplete="off"
          style={{ width: "30%", marginRight: "20px" }}
        />
        <Button variant="contained" color="primary" type="submit">
          Get Reset Link
        </Button>
      </form>
      {message.length > 0 && <div>{message}</div>}
    </>
  );
};

export default PasswordReset;
