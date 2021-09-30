import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

const EmailRedirect = (props) => {
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        `https://leetbook.herokuapp.com/users/reset/${props.match.params.id}`
      );
      if (data?.message === "Reset link is valid.") {
        setUserId(data.id);
      }
    })();
  }, [props]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.patch(
      `https://leetbook.herokuapp.com/users/reset/${userId}`,
      { password: password.trim() }
    );
    setMessage(data.message);
  };
  return (
    <>
      {userId ? (
        <>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "75px 0",
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              type="password"
              value={password}
              size="small"
              label="New Password"
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              autoComplete="off"
              style={{ width: "30%", marginRight: "20px" }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ textTransform: "none" }}
            >
              Change Password
            </Button>
          </form>
          {message.length > 0 && (
            <h3 style={{ textAlign: "center", color: "#4b6587" }}>{message}</h3>
          )}
          {message ===
            "Password updated successfully! Now you can login with your new password." && (
            <h3
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <Link style={{ color: "#63B4B8" }} to="/auth">
                Go to Login
              </Link>
            </h3>
          )}
        </>
      ) : (
        <h3 style={{ textAlign: "center", color: "red", marginTop: "30px" }}>
          Please try another reset link as this one is either invalid or has
          expired.
        </h3>
      )}
    </>
  );
};

export default EmailRedirect;
