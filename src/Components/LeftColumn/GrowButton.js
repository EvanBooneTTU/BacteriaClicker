import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Line } from "@tiaanduplessis/react-progressbar";
import "./GrowButton.scss";
import { prettyNumber } from "../PrettyNumber";

const useStyles = makeStyles({
  titleBox: {
    height: "65px",
    width: "100%",
    flexShrink: "0",
    backgroundColor: "#263238",
    boxShadow: "inset 0 0 7px 0 #171c1e",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: "300px",
    minHeight: "350px",
    height: "47.8vh",
  },
  typography: {
    color: "white",
    textAlign: "center",
    paddingTop: "15px",
  },
  button: {
    all: "unset",
    backgroundImage: `url(${"./Images/Summoners_Rift_Top_5.png"})`,
    backgroundSize: "cover",
    marginTop: "-21px",
    height: "calc(100% - 85px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  growIcon: {
    borderRadius: "50%",
    width: "245px",
    height: "245px",
    boxShadow: "0 0 0 5px #263238",
    backgroundColor: "#263238",
    position: "relative",
    display: "flex",
    "&:hover": {
      top: "-3px",
    },
    "&:active": {
      top: "0px",
    },
  },
  growRoot: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: "300px",
    minHeight: "350px",
    height: "47.8vh",
  },
});

export default function GrowButton(props) {
  const classes = useStyles();

  let [elements, setElements] = useState([]);

  let text2 = {
    value: props.current.toFixed(0) + " / " + props.max + " filler",
    style: {
      color: "white",
      float: "right",
      padding: "0 10px 0 0",
      margin: 0,
      transform: {
        prefix: true,
        value: "translate(0%, -100%)",
      },
    },
  };

  return (
    <div className={classes.growRoot}>
      <div className={classes.titleBox}>
        <Typography className={classes.typography} variant="h4" gutterBottom>
          {props.total}
          <div style={{ all: "unset", color: "#adb1b4" }}> Grows</div>
        </Typography>
      </div>
      <Line
        duration={0.1}
        easing="easeIn"
        key={props.current}
        progress={props.progress}
        strokeWidth={3}
        containerClassName={"progressbar"}
        color={"#848484"}
        trailColor="#455a64"
        svgStyle={{
          display: "block",
          width: "100%",
          height: "20px",
        }}
        text={text2}
      />
      <button className={classes.button}>
        <img
          onClick={(event) => {
            props.onClick();
            event.persist();
            setElements((prevArray) => [
              ...prevArray,
              <div
                id="growClickAnimation"
                style={{ top: event.clientY - 25, left: event.clientX - 15 }}
              >
                +{prettyNumber(props.growPerClick)}
              </div>,
            ]);
            if (elements.length > 200) {
              setElements([]);
            }
          }}
          className={classes.growIcon}
          src="./Images/Plague_Icon_3.png"
          alt="Dummy growIcon"
        />
      </button>
      {elements.map((element) => element)}
    </div>
  );
}
