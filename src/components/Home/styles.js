import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    marginLeft: theme.spacing(5),
    minWidth: 120,
  },
  new__post__button: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    color: "white",
    fontSize: "0.8rem",
    marginRight: "75px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.57)",
    },
  },
  titleSearch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
  },
  searchTagsDiv: {
    textAlign: "center",
    margin: "25px 50px",
    marginTop: "10px",
  },
}));
