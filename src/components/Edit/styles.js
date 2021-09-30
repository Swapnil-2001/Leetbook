import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  custom__file__upload: {
    margin: "100px 0 30px 0",
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
}));
