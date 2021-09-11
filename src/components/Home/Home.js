import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tagToDelete !== tag));

  const searchPost = (event) => {
    event.preventDefault();
    if (search.trim() !== "") {
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) searchPost();
  };

  return (
    <div>
      <Form />
      <div>
        <input
          value={search}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ChipInput
          style={{ margin: "10px 0" }}
          value={tags}
          onAdd={handleAdd}
          onDelete={handleDelete}
          label="Search Tags"
          variant="outlined"
        />
        <button onClick={searchPost}>Search Post</button>
      </div>
      <Pagination />
      <Posts />
    </div>
  );
};

export default Home;
