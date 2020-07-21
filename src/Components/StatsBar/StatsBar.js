import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import { Line } from "@tiaanduplessis/react-progressbar";
import { prettyNumber } from "../PrettyNumber";
import Tooltip from "@material-ui/core/Tooltip";

const styles = (theme) => ({
  left: {
    width: "calc(100% - 327px)",
    minWidth: "350px",
    height: "65px",
    color: "white",
    backgroundColor: "#263238",
    boxShadow: "inset 11px 11px 10px -10px #171c1e",
  },
  middle: {
    width: "327px",
    minWidth: "327px",
    height: "65px",
    float: "right",
    color: "white",
    backgroundColor: "#263238",
    boxShadow: "inset -11px 11px 10px -10px #171c1e",
    textAlign: "left",
    whiteSpace: "pre-wrap",
  },
  right: {
    width: "65px",
    height: "65px",
    display: "flex",
    backgroundColor: "#848484",
    boxShadow: "inset 0 0 2px 0 #171c1e",
  },
  bottom: {
    height: "20px",
    width: "100%",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    height: "85px",
    width: "100%",
  },
  coinIcon: {
    marginTop: "10px",
    float: "left",
    position: "static",
    height: "27px",
    width: "27px",
  },
  levelText: {
    textAlign: "center",
    float: "right",
    width: "100%",
    fontWeight: "475",
    color: "white",
  },
  statsPortion: {
    width: "calc(100% - 65px)",
    display: "flex",
  },
  incomeCoinIcon: {
    height: "15px",
    width: "15px",
    paddingRight: "3px",
  },
});

const StatToolTip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#171C1E",
    color: "#86806C",
    fontSize: 13,
  },
  arrow: {
    color: "#171C1E",
  },
}))(Tooltip);

class StatsBar extends React.Component {
  render() {
    const { classes } = this.props;
    let text2 = {
      value:
        this.props.currentXp.toFixed(0) +
        " / " +
        this.props.xpToLevelUp +
        " Xp",
      style: {
        color: "white",
        float: "right",
        padding: "0 10px 1px 0",
        margin: 0,
        transform: {
          prefix: true,
          value: "translate(0%, -100%)",
        },
      },
    };

    return (
      <div className={classes.root}>
        <div className={classes.statsPortion}>
          <div className={classes.left}>
            <div style={{ height: "60%", width: "50%", paddingLeft: "10px" }}>
              <Avatar
                variant="square"
                alt="coins"
                src="./Images/coins.png"
                className={classes.coinIcon}
              />
              <h1
                style={{
                  margin: "1px 0px 0px 2px",
                }}
              >
                {prettyNumber(this.props.currency)}
              </h1>
            </div>
            <div
              style={{
                height: "40%",
                width: "50%",
                paddingLeft: "10px",
              }}
            >
              <h3
                style={{
                  textAlign: "left",
                  float: "left",
                  margin: "0",
                }}
              >
                Income{" "}
                <img
                  alt="coins"
                  src="./Images/coins.png"
                  className={classes.incomeCoinIcon}
                />
                {prettyNumber(this.props.income)}
              </h3>
            </div>
          </div>
          <div className={classes.middle}>
            <div
              style={{
                width: "50%",
                height: "35%",
                marginTop: "10px",
                display: "inline-block",
              }}
            >
              <StatToolTip
                arrow
                title={"Grow clicks per second"}
                placement="left"
              >
                <div
                  style={{
                    display: "inline-block",
                    width: "103px",
                    textAlign: "right",
                  }}
                >
                  Grow Rate:
                </div>
              </StatToolTip>
              <div style={{ display: "inline-block" }}>
                {" "}
                {prettyNumber(this.props.growClickPerSecond)}
              </div>
            </div>
            <div
              style={{
                width: "50%",
                height: "35%",
                marginTop: "10px",
                display: "inline-block",
              }}
            >
              <StatToolTip
                arrow
                title={"Spread damage per click"}
                placement="left"
              >
                <div
                  style={{
                    display: "inline-block",
                    width: "89px",
                    textAlign: "right",
                  }}
                >
                  Infectability:
                </div>
              </StatToolTip>
              <div style={{ display: "inline-block" }}>
                {" "}
                {prettyNumber(this.props.spreadPerClick)}
              </div>
            </div>

            <div
              style={{
                width: "50%",

                height: "65%",
                marginTop: "-10px",
                display: "inline-block",
              }}
            >
              <StatToolTip
                arrow
                title={"Nutrient increase per click"}
                placement="left"
              >
                <div>
                  Growth Factor: {prettyNumber(this.props.growPerClick)}
                </div>
              </StatToolTip>
            </div>

            <div
              style={{
                width: "50%",

                height: "65%",
                marginTop: "-10px",
                display: "inline-block",
              }}
            >
              <StatToolTip
                arrow
                title={"Spread Clicks Per Second"}
                placement="left"
              >
                <div>
                  Spread Rate: {prettyNumber(this.props.spreadClickPerSecond)}
                </div>
              </StatToolTip>
            </div>
          </div>
        </div>

        <div className={classes.right}>
          <Typography gutterBottom variant="h2" className={classes.levelText}>
            {this.props.playerLevel}
          </Typography>
        </div>
        <StatToolTip arrow title={"Experience for next level"} placement="top">
          <div className={classes.bottom}>
            <Line
              duration={0.000000001}
              easing="easeIn"
              key={this.props.currentXp}
              progress={this.props.xpProgress}
              strokeWidth={3}
              containerClassName={"progressbar"}
              color={"#848484"}
              trailColor="#455a64"
              svgStyle={{
                display: "block",
                width: "calc(100% - 1px)",
                height: "20px",
                borderLeft: "1px solid #171c1e",
              }}
              text={text2}
            />
          </div>
        </StatToolTip>
      </div>
    );
  }
}

export default withStyles(styles)(StatsBar);
