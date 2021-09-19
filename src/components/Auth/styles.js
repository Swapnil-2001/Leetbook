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
}));
