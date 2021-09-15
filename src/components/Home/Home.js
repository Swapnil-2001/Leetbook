import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import AddIcon from "@material-ui/icons/Add";

import { getPostsBySearch } from "../../actions/posts";
import { REMOVE_ID } from "../../constants/actionTypes";
import Posts from "../Posts/Posts";
import Pagination from "../Pagination";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const classes = useStyles();
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
      {user && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            component={Link}
            to="/posts/create"
            variant="contained"
            className={classes.new__post__button}
            endIcon={<AddIcon />}
          >
            New Post
          </Button>
        </div>
      )}
      <Posts />
      {!searchQuery && !tagsQuery && <Pagination page={page} />}
    </div>
  );
};

export default Home;
