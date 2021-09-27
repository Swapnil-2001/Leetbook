import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& h2": {
      color: "#4b6587",
    },
  },
  create__post__div: {
    margin: "50px 100px",
  },
  button: {
    width: "100px",
    marginTop: "25px",
    borderRadius: "0",
    fontSize: "0.8rem",
  },
  tagsDiv: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: "0 150px",
  },
  wrapper: {
    marginTop: "40px",
    border: "1px solid #3D56B2",
  },
  editor: {
    padding: "20px 30px",
  },
  toolbar: {
    border: "1px solid #3D56B2",
  },
}));
