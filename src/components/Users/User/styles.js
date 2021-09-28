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
  profileImg: {
    textAlign: "center",
    marginTop: "75px",
    "& img": {
      width: "175px",
      height: "175px",
      borderRadius: "50%",
      objectFit: "contain",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  },
  name: {
    marginTop: "50px",
    color: "#4b6587",
  },
  username: {
    margin: "10px 0",
    color: "#5C7AEA",
  },
  email: {
    margin: "20px 0",
    color: "#38A3A5",
  },
}));
