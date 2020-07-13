import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Line } from "@tiaanduplessis/react-progressbar";
import "./GrowButton.scss";
var x = 0;

const styles = (theme) => ({
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
});

class GrowButton extends React.Component {
  buttonClick(event, props) {
    props.onclick();
    let growRoot = document.getElementById("growRoot");
    let newDiv = document.createElement("div");
    newDiv.innerText = "+1.0";
    newDiv.setAttribute("id", "x" + x++);
    newDiv.style.top = event.clientY + "px";
    newDiv.style.left = event.clientX - 10 + "px";
    growRoot.appendChild(newDiv);
  }

  render() {
    const { classes } = this.props;

    let text2 = {
      value: this.props.current.toFixed(0) + " / " + this.props.max + " filler",
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
      <div id="growRoot">
        <div className={classes.titleBox}>
          <Typography className={classes.typography} variant="h4" gutterBottom>
            {this.props.total}
            <div style={{ all: "unset", color: "#adb1b4" }}> Grows</div>
          </Typography>
        </div>
        <Line
          duration={0.1}
          easing="easeIn"
          key={this.props.current}
          progress={this.props.progress}
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
            onClick={(e) => this.buttonClick(e, this.props)}
            id="growIcon"
            src="./Images/Plague_Icon_3.png"
            alt="Dummy growIcon"
          />
        </button>
      </div>
    );
  }
}

export default withStyles(styles)(GrowButton);
