import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Lock";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";
import { Line } from "@tiaanduplessis/react-progressbar";

const styles = (theme) => ({
  button: {
    height: "75px",
    width: "75px",
    backgroundSize: "cover",
    backgroundColor: "#171c1e",
    borderRadius: "0",
  },
  root: {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const StatToolTip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, 0.88)",
    color: "#86806C",
    fontSize: 13,
    width: "244px",
  },
}))(Tooltip);

class Spell extends React.Component {
  render() {
    const { classes } = this.props;

    let text2 = {
      value: this.props.cooldownTimer,
      style: {
        color: "#F0EAE9",
        margin: 0,
        fontSize: "23px",
        transform: {
          prefix: true,
          value: "translate(0%, -150%)",
        },
      },
    };

    if (this.props.spellUnlocked && !this.props.onCooldown) {
      return (
        <div className={classes.root}>
          <StatToolTip
            title={
              <React.Fragment>
                <Typography
                  display="inline"
                  variant="body2"
                  style={{ lineHeight: "1.2" }}
                >
                  {this.props.toolTipDescription1}
                </Typography>
                <Typography
                  variant="body2"
                  display="inline"
                  style={{ lineHeight: "1.2", color: "#C58519" }}
                >
                  {this.props.spellDamage}
                </Typography>
                <Typography
                  display="inline"
                  variant="body2"
                  style={{
                    lineHeight: "1.2",
                    display: this.props.toolTipDescription2.localeCompare("")
                      ? ""
                      : "none",
                  }}
                >
                  {this.props.toolTipDescription2}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    lineHeight: "1.2",
                    display: this.props.toolTipDescription3.localeCompare("")
                      ? ""
                      : "none",
                  }}
                >
                  <br />
                  {this.props.toolTipDescription3}
                </Typography>
                <Typography variant="body2" style={{ lineHeight: "1.2" }}>
                  <br />
                  {this.props.cooldown} second cooldown
                </Typography>
              </React.Fragment>
            }
            placement="left"
          >
            <div>
              <Button
                style={{ backgroundImage: `url(${this.props.src})` }}
                className={classes.button}
                onClick={() => this.props.activateSpell(this.props.index)}
                disabled={
                  this.props.spellName.localeCompare("NoClick") ? false : true
                }
              ></Button>
            </div>
          </StatToolTip>
        </div>
      );
    } else if (!this.props.spellUnlocked) {
      return (
        <div className={classes.root}>
          <Button className={classes.button} disabled>
            <LockIcon style={{ color: "#45494B" }} fontSize="large" />
          </Button>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <Button
            style={{ backgroundImage: `url(${this.props.src})` }}
            className={classes.button}
            disabled
          >
            <Line
              duration={0.000000001}
              key={this.props.cooldownTimer}
              easing="easeIn"
              progress={this.props.cooldownTimer / this.props.cooldown}
              strokeWidth={3}
              containerClassName={"progressbar"}
              color={"rgba(0,0,0,0.8)"}
              trailColor="rgba(0,0,0,0.4)"
              svgStyle={{
                paddingTop: "42px",
                display: "block",
                width: "75px",
                height: "75px",
              }}
              text={text2}
            />
          </Button>
        </div>
      );
    }
  }
}

export default withStyles(styles)(Spell);
