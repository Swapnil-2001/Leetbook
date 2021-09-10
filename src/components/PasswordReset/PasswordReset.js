import axios from "axios";
import React, { useState } from "react";

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
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <button type="submit">Reset</button>
      </form>
      {message.length > 0 && <div>{message}</div>}
    </>
  );
};

export default PasswordReset;
