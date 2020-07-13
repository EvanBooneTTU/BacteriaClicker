import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Lock";

const styles = (theme) => ({
  button: {
    height: "75px",
    width: "75px",
    backgroundSize: "cover",
    backgroundColor: "#171C1E",
  },
  root: {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

class Spell extends React.Component {
  render() {
    const { classes } = this.props;
    if (this.props.spellUnlocked) {
      return (
        <div className={classes.root}>
          <Button
            style={{ backgroundImage: `url(${this.props.src})` }}
            className={classes.button}
            onClick={() => this.props.activateSpell(this.props.index)}
          ></Button>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <Button className={classes.button} disabled>
            <LockIcon style={{ color: "#45494B" }} fontSize="large" />
          </Button>
        </div>
      );
    }
  }
}

export default withStyles(styles)(Spell);
