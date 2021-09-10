import axios from "axios";
import React, { useState, useEffect } from "react";

const EmailRedirect = (props) => {
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        `http://localhost:5000/users/reset/${props.match.params.id}`
      );
      if (data?.message === "Reset link is valid.") {
        setUserId(data.id);
      }
    })();
  }, [props]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.patch(
      `http://localhost:5000/users/reset/${userId}`,
      { password: password.trim() }
    );
    setMessage(data.message);
  };
  return (
    <>
      {userId ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Change Password</button>
          </form>
          {message.length > 0 && <div>{message}</div>}
        </>
      ) : (
        <>
          Please try another reset link as this one is either invalid or has
          expired.
        </>
      )}
    </>
  );
};

export default EmailRedirect;
