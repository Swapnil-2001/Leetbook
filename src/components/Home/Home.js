import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPostsBySearch } from "../../actions/posts";
import { REMOVE_ID } from "../../constants/actionTypes";
import Posts from "../Posts/Posts";
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const tagsQuery = query.get("tags");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch({ type: REMOVE_ID });
    if (
      (!search && searchQuery !== "none" && searchQuery) ||
      (!tags.length && tagsQuery)
    ) {
      history.push("/posts");
    }
  }, [searchQuery, tagsQuery, history, search, tags, dispatch]);

  const handleAdd = (tag) => setTags([...tags, tag.trim()]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tagToDelete !== tag));

  const searchPost = (event) => {
    event.preventDefault();
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const clearSearches = () => {
    setTags([]);
    setSearch("");
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) searchPost();
  };

  return (
    <div>
      {user && <Link to="/posts/create">New Post +</Link>}
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
        <button type="button" onClick={clearSearches}>
          Clear search
        </button>
      </div>
      {!searchQuery && !tagsQuery && <Pagination page={page} />}
      <Posts />
    </div>
  );
};

export default Home;
