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
    backgroundColor: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      border: "2px solid #686D76",
    },
  },
  leftHalf: {
    flex: 10,
  },
  rightHalf: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: "15px",
  },
  footer: {
    marginTop: "15px",
    fontSize: "0.9rem",
    color: "#8D93AB",
  },
}));
