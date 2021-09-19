import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  heading: {
    color: "#4b6587",
    margin: "75px 0 30px 0",
  },
  input__wrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
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
