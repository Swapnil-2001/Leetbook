import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Modal, Backdrop, Fade } from "@material-ui/core";

import { deletePost } from "../../actions/posts";
import useStyles from "./styles";

const DeleteModal = ({ open, setOpen, postId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h3>Are you sure you want to delete this post?</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "15px" }}
              onClick={() => setOpen(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(deletePost(postId));
                setOpen(false);
                history.push("/posts");
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;
