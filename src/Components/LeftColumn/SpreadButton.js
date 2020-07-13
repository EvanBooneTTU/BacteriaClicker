import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Line } from "@tiaanduplessis/react-progressbar";
import Avatar from "@material-ui/core/Avatar";

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
    backgroundSize: "cover",
    width: "100%",
    minWidth: "300px",
    minHeight: "350px",
    height: "47.8vh",
  },
  typography: {
    marginTop: "7px",
    marginBottom: "-7px",
    color: "white",
    textAlign: "center",
  },
  subTitleBoxLeft: {
    color: "#adb1b4",
    float: "left",
    paddingLeft: "20%",
  },
  coinIcon: {
    height: "18px",
    width: "18px",
    display: "inline-block",
  },
  subTitleBoxRight: {
    color: "#adb1b4",
    float: "right",
    paddingRight: "20%",
    paddingTop: "4px",
  },
  icon: {
    borderRadius: "50%",
    width: "250px",
    height: "250px",
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
  button: {
    all: "unset",
    backgroundImage: `url(${"./Images/valley_2.png"})`,
    backgroundSize: "cover",
    marginTop: "-23px",
    height: "calc(100% - 85px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

class SpreadButton extends React.Component {
  handleClick = (e) => {
    this.props.onclick();
  };

  render() {
    const { classes } = this.props;

    let text2 = {
      value: this.props.current.toFixed(0) + " / " + this.props.max + " hp",
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
      <div className={classes.root}>
        <div className={classes.titleBox}>
          <Typography className={classes.typography} variant="h4" gutterBottom>
            {this.props.spreadButtonName}
          </Typography>
          <Typography
            className={classes.subTitleBoxLeft}
            variant="body2"
            gutterBottom
          >
            <Avatar
              variant="square"
              alt="coins"
              src="./Images/coins.png"
              className={classes.coinIcon}
              style={{ paddingRight: "5px" }}
            />
            {this.props.goldForKill.toFixed(0)}
          </Typography>
          <Typography
            className={classes.subTitleBoxRight}
            variant="body2"
            gutterBottom
          >
            {this.props.xpPerKill} xp
          </Typography>
        </div>
        <Line
          duration={0.1}
          key={this.props.current + this.props.max}
          progress={this.props.progress}
          strokeWidth={3}
          trailWidth={3}
          color="#848484"
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
            onClick={(e) => this.handleClick(e)}
            src={this.props.spreadButtonImage}
            alt="Country Icon"
            className={classes.icon}
          />
        </button>
      </div>
    );
  }
}

export default withStyles(styles)(SpreadButton);
