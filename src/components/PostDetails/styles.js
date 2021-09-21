import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  header__div: {
    padding: "25px",
    "& p": {
      fontSize: "0.9rem",
      marginTop: "5px",
      color: "#6B7AA1",
    },
  },
  icons: {
    marginRight: "20px",
  },
  content: {
    padding: "25px",
  },
  recommended__div: {
    textAlign: "center",
    margin: "15px 0",
  },
  recommended__post: {
    margin: "15px 10px",
    padding: "20px 50px",
    border: "1px solid rgba(0, 0, 0, 0.35)",
    display: "inline-flex",
    flexDirection: "column",
    cursor: "pointer",
    "& p": {
      fontSize: "0.9rem",
      marginTop: "5px",
      color: "#6B7AA1",
    },
    "&:hover": {
      border: "1px solid #686D76",
    },
  },
  commentsOuterContainer: {
    backgroundColor: "#F4F9F9",
    margin: "0 75px 30px 75px",
    padding: "30px",
    paddingBottom: "20px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
