import React, { useState } from "react";

const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
  });
  const handleSubmit = () => {};
  const clear = (e) => {
    e.preventDefault();
    setPostData({ creator: "", title: "", message: "", tags: "" });
  };
  return (
    <div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h3>Create a post</h3>
        <textarea
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <textarea
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <textarea
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <textarea
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <button type="submit">Submit</button>
        <button onClick={clear}>Clear</button>
      </form>
    </div>
  );
};

export default Form;
