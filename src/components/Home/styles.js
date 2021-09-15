import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  new__post__button: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    color: "white",
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.57)",
    },
  },
}));
