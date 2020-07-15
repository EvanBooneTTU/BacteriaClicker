import React from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import Spell from "./Spell";
import { prettyTime } from "../PrettyNumber";

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
          spellDamage={spell.spellDamage}
          cooldown={spell.cooldown}
          toolTipDescription1={spell.toolTipDescription1}
          toolTipDescription2={spell.toolTipDescription2}
          toolTipDescription3={spell.toolTipDescription3}
          onCooldown={spell.onCooldown}
          cooldownTimer={spell.cooldownTimer}
        />
      );
    });

    return <div>{spells}</div>;
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.timer}>{prettyTime(this.props.time)}</div>
        <List>{this.renderSpells(this.props)}</List>
      </div>
    );
  }
}

export default withStyles(styles)(SpellBar);
