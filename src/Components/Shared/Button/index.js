import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

function Index({ onClick, label, height }) {
  const classes = useStyles({ height });

  return (
    <Button onClick={onClick} className={classes.root}>
      {label}
    </Button>
  );
}

export default Index;

const useStyles = makeStyles({
  root: {
    "&.MuiButtonBase-root": {
      backgroundColor: "#07A95B",
      color: "white",
      width: "200px",
      fontSize: "17px",
      "&:hover": {
        backgroundColor: "#07A95B",
      },
      // [theme.breakpoints.down("sm")]: {
      //   maxWidth: "100%",
      //   width: "100%",
      //   "&:hover": {
      //     backgroundColor: "#07A95B",
      //   },
      // },
      textTransform: "capitalize",
      height: (props) => (props.height ? props.height : "47px"),
    },
  },
});
