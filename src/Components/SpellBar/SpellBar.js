import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import Spell from "./Spell";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";

const styles = (theme) => ({
  root: {
    backgroundColor: "#101010",
    height: "95.3vh",
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: "20px",
    paddingTop: "25px",
  },
  timecode: {
    color: "white",
  },
});

class SpellBar extends React.Component {
  renderSpells(props) {
    let spells = [];
    props.spellData.forEach((spell, index) => {
      spells[index] = (
        <Spell
          spellName={spell.spellName}
          src={spell.src}
          spellUnlocked={spell.spellUnlocked}
          levelToUnlock={spell.levelToUnlock}
          index={spell.index}
          activateSpell={props.activateSpell}
        />
      );
    });

    return <div>{spells}</div>;
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Timer className={classes.timer} active duration={null}>
          <Timecode className={classes.timecode} />
        </Timer>
        <List>{this.renderSpells(this.props)}</List>
      </div>
    );
  }
}

export default withStyles(styles)(SpellBar);
