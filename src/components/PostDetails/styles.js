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
}));
