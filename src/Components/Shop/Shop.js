import React from "react";
import List from "@material-ui/core/List";
import ShopItem from "./ShopItem";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    padding: "0px",
    overflow: "auto",
    height: "86.5vh",
    backgroundColor: "#171c1e",
  },
});

class Shop extends React.Component {
  renderShopItems(props) {
    let shopItemBars = [];
    props.shopData.forEach((item, index) => {
      shopItemBars[index] = (
        <ShopItem
          alt={item.alt}
          src={item.src}
          divider={item.divider}
          initialPrice={item.initialPrice}
          infectability={item.infectability}
          spreadPerSecond={item.spreadClickPerSecond}
          growthFactor={item.growthFactor}
          growthPerSecond={item.growClickPerSecond}
          income={item.income}
          itemName={item.itemName}
          buyItem={props.buyItem}
          id={item.id}
          index={item.index}
          price={item.price}
          price10={item.price10}
          price100={item.price100}
          price1000={item.price1000}
          amount={item.amount}
          itemUnlocked={item.itemUnlocked}
          levelToUnlock={item.levelToUnlock}
          upgrades={item.upgrades}
          upgradeStats={item.upgradeStats}
          displayUpgrade={item.displayUpgrade}
          upgradeClick={props.itemUpgrade}
        />
      );
    });

    return <div>{shopItemBars}</div>;
  }

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>{this.renderShopItems(this.props)}</List>
    );
  }
}

export default withStyles(styles)(Shop);
