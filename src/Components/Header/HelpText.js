import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    color: "#C58519",
  },
  paragraph: {
    color: "white",
  },
}));

export default function HelpText() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h3 className={classes.header}>Introduction</h3>
      <p className={classes.paragraph}>
        Covid Clicker is a plague themed incremental game. Your goal is to grow
        colonies, infect continents, and gain experience as you level up to
        victory. To help you, there is a series of items, upgrades, and spells
        to unlock along the way.
      </p>
      <h3 className={classes.header}>Colonies and Nutrients</h3>
      <p className={classes.paragraph}>
        Click the large grow button in the upper left to collect nutrients.
        After gathering enough, you&#8217;ll earn Colonies. Each colony grants
        bonus damage to help you infect continets.
      </p>
      <h3 className={classes.header}>Continets</h3>
      <p className={classes.paragraph}>
        Click the large continent button in the bottom left to deal damage to
        the current continent. After defeating a continent, you&#8217;ll be
        rewarded for your hard work with gold (for items and upgrades) and
        experience (for leveling up). New continents are unlocked at each level,
        but get harder to kill as you progress further in the game.
      </p>
      <h3 className={classes.header}>Items</h3>
      <p className={classes.paragraph}>
        The shop offers items that can help you gather Colonies and infect
        continents faster. Each item has a price that increases for every unit
        purchased. You can buy an item in bulk using the additional purchase
        buttons. Items have the following stats:
      </p>
      <ul className={classes.paragraph}>
        <li>
          <b>Growth Factor</b> - Nutrients gathered per click, 1 growth factor =
          1 nutrient per click.
        </li>
        <li>
          <b>Grow Rate</b> - Automatic nutrient gathering, 1 grow rate = 1 grow
          click per second.
        </li>
        <li>
          <b>Infectability</b> - Damage dealt per click, 1 Infectability = 1
          damage per click.
        </li>
        <li>
          <b>Spread Rate</b> - Automatic damage dealing, 1 spread rate = 1
          damage click per second.
        </li>
        <li>
          <b>Income</b> - Gold generation, 1 income = 1 gold per second.
        </li>
      </ul>

      <h3 className={classes.header}>Upgrades</h3>
      <p className={classes.paragraph}>
        After leveling up enough, you&#8217;ll start to unlock upgrades for your
        items. As with items, each upgrade has its own price and stats. After
        purchasing an upgrade, all past and future units of the associated item
        are granted the upgrade's bonus stats.
      </p>
      <h3 className={classes.header}>Spells</h3>
      <p className={classes.paragraph}>
        On the right edge, you&#8217;ll find a series of spells, each with its
        own unique effect. Unlock them by leveling up. All spells are free once
        unlocked, but go on cooldown after every use. Hover over your unlocked
        spells to learn how they work!
      </p>
    </React.Fragment>
  );
}
