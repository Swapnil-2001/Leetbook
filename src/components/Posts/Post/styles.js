import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  wrapper__div: {
    border: "2px solid #BBBFCA",
    padding: "30px",
    marginBottom: "20px",
    transition: "border 0.2s",
    cursor: "pointer",
    "&:hover": {
      border: "2px solid #686D76",
    },
  },
  title: {
    marginBottom: "10px",
  },
  footer: {
    margin: "10px 0",
    fontSize: "0.9rem",
    color: "#8D93AB",
  },
}));
