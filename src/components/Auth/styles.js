import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  file__div: {
    marginTop: "30px",
  },
  custom__file__upload: {
    border: "1px solid #C8C6C6",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 12px",
    cursor: "pointer",
    transition: "border 0.3s",
    "& input": {
      display: "none",
    },
    "&:hover": {
      border: "1px solid #787A91",
    },
  },
  heading: {
    color: "#4b6587",
    marginTop: "75px",
  },
  input__wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30px",
  },
  right__div: {
    flex: "1.5",
    color: "#6B7AA1",
    textAlign: "center",
    "& img": {
      width: "75%",
    },
  },
  right__div__text: {
    margin: "75px 75px 25px 75px",
  },
}));
