import { makeStyles } from "@mui/styles";
import React from "react";
import sideImg from "../../../assets/images/side_img.png";

function Index({ children }) {
  const classes = useStyles();

  return (
    <div className=" w-full flex flex-row">
      <div className={`w-2/5 h-screen ${classes.leftBox}`}></div>
      <div
        className={`w-3/5 h-screen flex flex-col justify-center items-center ${classes.rightBox}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Index;

const useStyles = makeStyles({
  rightBox: {
    backgroundColor: "#2C1D4F",
  },
  leftBox: {
    // backgroundColor: "#000000",
    backgroundImage: `url(${sideImg})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
});
