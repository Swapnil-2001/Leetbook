import axios from "axios";
import React, { useState } from "react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/users/resetPassword",
        { email }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <button type="submit">Reset</button>
    </form>
  );
};

export default PasswordReset;
