import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Button, Chip, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

import { getPostsBySearch } from "../../actions/posts";
import { menuItems } from "../Form/menuItems";
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
  const [selected, setSelected] = useState(
    new Array(menuItems.length).fill(false)
  );

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
    setSelected(new Array(menuItems.length).fill(false));
  };

  return (
    <div>
      <div>
        <div className={classes.titleSearch}>
          <SearchIcon color="primary" />
          <TextField
            name="search"
            style={{ marginLeft: "10px", width: "40%" }}
            variant="outlined"
            label="Search By Title"
            value={search}
            autoComplete="off"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={classes.searchTagsDiv}>
          {menuItems.map((item, index) => (
            <Chip
              label={item}
              clickable
              onClick={() => {
                if (selected[index]) handleDelete(item);
                else handleAdd(item);
                setSelected(
                  selected.map((value, ind) => (ind === index ? !value : value))
                );
              }}
              variant={selected[index] ? "default" : "outlined"}
              color="primary"
              style={{ margin: "20px 5px 0 5px" }}
            />
          ))}
        </div>
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
