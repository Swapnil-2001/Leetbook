import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../actions/posts";

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, dispatch]);
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}
    >
      <Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        )}
      />
    </div>
  );
};

export default Paginate;
