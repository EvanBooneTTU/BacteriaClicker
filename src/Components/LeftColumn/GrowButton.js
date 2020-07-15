import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Line } from "@tiaanduplessis/react-progressbar";
import "./GrowButton.scss";
import { prettyNumber, randomNumber } from "../PrettyNumber";
import Tooltip from "@material-ui/core/Tooltip";

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
      cursor: "pointer",
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

const StatToolTip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#171C1E",
    color: "#86806C",
    fontSize: 13,
    width: "244px",
  },
  arrow: {
    color: "#171C1E",
  },
}))(Tooltip);

export default function GrowButton(props) {
  const classes = useStyles();

  let [elements, setElements] = useState([]);

  let text2 = {
    value: props.current.toFixed(0) + " / " + props.max + " Nutrients",
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
          <StatToolTip
            arrow
            title={
              "Collect nutrients to grow colonies. Colonies grant 2 extra growth factor each."
            }
            placement="right"
          >
            <div style={{ all: "unset", color: "#adb1b4" }}> Colonies</div>
          </StatToolTip>
        </Typography>
      </div>
      <Line
        duration={0.1}
        easing="easeIn"
        key={props.current + props.max}
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
                style={{
                  top: event.clientY - 25,
                  left: event.clientX - 15 + randomNumber(-7, 7),
                }}
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
