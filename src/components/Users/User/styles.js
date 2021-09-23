import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  wrapper__div: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    marginTop: "75px",
    color: "#4b6587",
  },
  username: {
    margin: "10px 0",
    color: "#5C7AEA",
  },
  email: {
    color: "#38A3A5",
  },
}));
