import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  navbar: {
    backgroundColor: "#4b6587",
    display: "flex",
    alignItems: "center",
  },
  navbar__logo: {
    color: "white",
    margin: "30px",
  },
  login__div: {
    marginLeft: "auto",
  },
}));
