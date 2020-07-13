import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Grid } from "@material-ui/core";
import GrowButton from "./Components/LeftColumn/GrowButton";
import SpreadButton from "./Components/LeftColumn/SpreadButton";
import Shop from "./Components/Shop/Shop";
import StatsBar from "./Components/StatsBar/StatsBar";
import { shopData } from "./Components/Shop/ShopData.js";
import { gameData } from "./GameData.js";
import { withStyles } from "@material-ui/core/styles";
import SpellBar from "./Components/SpellBar/SpellBar";
import { spellData } from "./Components/SpellBar/SpellData.js";

const styles = (theme) => ({
  test: {
    height: "100%",
    width: "100%",
  },
  root: {
    height: "100%",
    backgroundColor: "cyan",
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.spreadButtonClick = this.spreadButtonClick.bind(this);
    this.growButtonClick = this.growButtonClick.bind(this);
    this.buyItem = this.buyItem.bind(this);

    this.state = {
      currency: 1000000000,
      growPerClick: 1, //Is == to infectability DONE
      spreadPerClick: 100, //Is == to growthFactor DONE
      growClickPerSecond: 0, //DONE
      spreadClickPerSecond: 0, //DONE
      income: 0,
      shopData,
      spellData,
      growButtonProgress: 0, //DONE
      spreadButtonProgress: 0, //DONE
      spreadMaxValue: 200, //This value and one below are what is displayed on progress bar DONE
      growMaxValue: 7, //DONE
      spreadCurrentValue: 0,
      growCurrentValue: 0,
      totalGrows: 0,
      totalSpreads: 0,
      playerLevel: 1,
      currentXp: 0,
      xpToLevelUp: 1000,
    };
  }

  spreadButtonClick() {
    //increase currency by growPerClick

    this.setState((prevState) => {
      let objectCopy = Object.assign({}, prevState);
      objectCopy.spreadCurrentValue =
        prevState.spreadCurrentValue + prevState.spreadPerClick;
      objectCopy.spreadButtonProgress =
        objectCopy.spreadCurrentValue / objectCopy.spreadMaxValue;
      if (objectCopy.spreadButtonProgress >= 1.0) {
        objectCopy.totalSpreads++;
        objectCopy.spreadButtonProgress = 0;
        objectCopy.spreadCurrentValue = 0;
        objectCopy.currentXp += gameData[prevState.playerLevel - 1].xpPerKill;
        objectCopy.spreadMaxValue +=
          gameData[prevState.playerLevel - 1].hpIncreasePerKill;
        objectCopy.currency += gameData[prevState.playerLevel - 1].goldPerKill;
      }
      return objectCopy;
    });
    console.log("current xp: " + this.state.currentXp);
  }

  growButtonClick() {
    this.setState((prevState) => {
      let objectCopy = Object.assign({}, prevState);
      objectCopy.growCurrentValue =
        prevState.growCurrentValue + prevState.growPerClick;
      objectCopy.growButtonProgress =
        objectCopy.growCurrentValue / objectCopy.growMaxValue;
      if (objectCopy.growButtonProgress >= 1.0) {
        objectCopy.totalGrows++;
        objectCopy.growButtonProgress = 0;
        objectCopy.growCurrentValue = 0;
        objectCopy.growMaxValue =
          prevState.growMaxValue + (prevState.playerLevel + 3);
        objectCopy.spreadPerClick = prevState.spreadPerClick + 2;
      }
      return objectCopy;
    });
  }

  passiveIncome() {
    this.setState((prevState) => {
      let objectCopy = Object.assign({}, prevState);
      objectCopy.currency = prevState.currency + prevState.income / 4;
      return objectCopy;
    });
  }

  passiveButtonClicks() {
    this.setState((prevState) => {
      //Spread Button Click
      let objectCopy = Object.assign({}, prevState);
      objectCopy.spreadCurrentValue =
        prevState.spreadCurrentValue +
        prevState.spreadPerClick * prevState.spreadClickPerSecond;
      objectCopy.spreadButtonProgress =
        objectCopy.spreadCurrentValue / objectCopy.spreadMaxValue;
      if (objectCopy.spreadButtonProgress >= 1.0) {
        objectCopy.totalSpreads++;
        objectCopy.spreadButtonProgress = 0;
        objectCopy.spreadCurrentValue = 0;
        objectCopy.currentXp += gameData[prevState.playerLevel - 1].xpPerKill;
        objectCopy.spreadMaxValue +=
          gameData[prevState.playerLevel - 1].hpIncreasePerKill;
        objectCopy.currency += gameData[prevState.playerLevel - 1].goldPerKill;
      }
      //Grow Button Click
      objectCopy.growCurrentValue =
        prevState.growCurrentValue +
        prevState.growPerClick * prevState.growClickPerSecond;
      objectCopy.growButtonProgress =
        objectCopy.growCurrentValue / objectCopy.growMaxValue;
      if (objectCopy.growButtonProgress >= 1.0) {
        objectCopy.totalGrows++;
        objectCopy.growButtonProgress = 0;
        objectCopy.growCurrentValue = 0;
        objectCopy.growMaxValue =
          prevState.growMaxValue + (prevState.playerLevel + 3);
        objectCopy.spreadPerClick = prevState.spreadPerClick + 2;
      }
      return objectCopy;
    });
    this.checkLevelUp();
  }

  checkLevelUp() {
    if (this.state.currentXp >= this.state.xpToLevelUp) {
      this.setState((prevState) => {
        let objectCopy = Object.assign({}, prevState);
        objectCopy.playerLevel++;
        //Unlock Locked Items
        objectCopy.shopData.forEach((item) => {
          if (item.levelToUnlock === objectCopy.playerLevel) {
            item.itemUnlocked = true;
          }
        });
        objectCopy.currentXp = 0;
        if (objectCopy.playerLevel <= 7) {
          objectCopy.xpToLevelUp =
            gameData[objectCopy.playerLevel - 1].xpToLevelUp;
          objectCopy.spreadMaxValue =
            gameData[objectCopy.playerLevel - 1].maxHpPerKill;
          console.log(objectCopy.spreadMaxValue);
        } else {
          objectCopy.xpToLevelUp = 9999999999;
          gameData.spreadMaxValue = 100000000;
        }
        return objectCopy;
      });
    }
  }

  componentDidMount() {
    this.setState((prevState) => {
      let objectCopy = Object.assign({}, prevState);
      objectCopy.shopData.forEach((item) => {
        console.log(item.index);
        objectCopy.shopData[item.index].price = this.calculatePurchaseCost(
          1,
          item.index
        );
        objectCopy.shopData[item.index].price10 = this.calculatePurchaseCost(
          10,
          item.index
        );
        objectCopy.shopData[item.index].price100 = this.calculatePurchaseCost(
          100,
          item.index
        );
        objectCopy.shopData[item.index].price1000 = this.calculatePurchaseCost(
          1000,
          item.index
        );
      });
      return objectCopy;
    });

    this.intervalID = setInterval(() => this.passiveButtonClicks(), 1000);
    this.intervalID = setInterval(() => this.passiveIncome(), 250);
  }

  calculateTotalCost(amount, index) {
    return (
      this.state.shopData[index].initialPrice *
        0.1 *
        ((Math.pow(amount, 3) - amount) / 6) +
      amount * this.state.shopData[index].initialPrice
    );
  }

  calculatePurchaseCost(amount, index) {
    return (
      this.calculateTotalCost(
        amount + this.state.shopData[index].amount,
        index
      ) - this.calculateTotalCost(this.state.shopData[index].amount, index)
    );
  }

  buyItem(amount, index) {
    let totalPrice = 0;
    switch (amount) {
      case 1:
        totalPrice = this.state.shopData[index].price;
        break;
      case 10:
        totalPrice = this.state.shopData[index].price10;
        break;
      case 100:
        totalPrice = this.state.shopData[index].price100;
        break;
      case 1000:
        totalPrice = this.state.shopData[index].price1000;
        break;
      default:
        //To prevent free items
        totalPrice = Number.MAX_SAFE_INTEGER;
        break;
    }

    if (this.state.currency >= totalPrice) {
      //Check to see if you have gold amount required
      this.setState((prevState) => {
        let objectCopy = Object.assign({}, prevState);
        //Subtracts item price
        objectCopy.currency = prevState.currency - totalPrice;
        //Increments item price
        console.log(Math.pow(1.15, amount));
        objectCopy.shopData[index].price =
          prevState.shopData[index].price * Math.pow(1.15, amount);
        //Increments amount of item in shop data
        objectCopy.shopData[index].amount =
          prevState.shopData[index].amount + amount;
        console.log(
          objectCopy.shopData[index].itemName +
            " " +
            objectCopy.shopData[index].amount
        );

        objectCopy.shopData[index].price = this.calculatePurchaseCost(1, index);
        objectCopy.shopData[index].price10 = this.calculatePurchaseCost(
          10,
          index
        );
        objectCopy.shopData[index].price100 = this.calculatePurchaseCost(
          100,
          index
        );
        objectCopy.shopData[index].price1000 = this.calculatePurchaseCost(
          1000,
          index
        );
        return objectCopy;
      });
      this.updateItemBuffs(amount, index);
    }
  }

  activateSpell(index) {
    switch (index) {
      case 0:
        //spell logic
        console.log("Spell 1 Click");
        break;
      case 1:
        //spell logic
        console.log("Spell 2 Click");
        break;
      case 2:
        //spell logic
        break;
      case 3:
        //spell logic
        break;
      case 4:
        //spell logic
        break;
      case 5:
        //spell logic
        break;
      case 6:
        //spell logic
        break;
      default:
        break;
    }
  }

  updateItemBuffs(amount, index) {
    this.setState((prevState) => {
      let objectCopy = Object.assign({}, prevState);
      objectCopy.growPerClick +=
        objectCopy.shopData[index].growthFactor * amount;
      objectCopy.spreadPerClick +=
        objectCopy.shopData[index].infectability * amount;
      objectCopy.growClickPerSecond +=
        objectCopy.shopData[index].growClickPerSecond * amount;
      objectCopy.spreadClickPerSecond +=
        objectCopy.shopData[index].spreadClickPerSecond * amount;
      objectCopy.income += objectCopy.shopData[index].income * amount;
      //UPDATE all stats for the items
      return objectCopy;
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item container xs={4} direction="row" className={classes.test}>
            <Grid container item>
              <GrowButton
                onclick={this.growButtonClick}
                progress={this.state.growButtonProgress}
                max={this.state.growMaxValue}
                current={this.state.growCurrentValue}
                total={this.state.totalGrows}
              />
              <SpreadButton
                onclick={this.spreadButtonClick}
                progress={this.state.spreadButtonProgress}
                max={this.state.spreadMaxValue}
                current={this.state.spreadCurrentValue}
                total={this.state.totalSpreads}
                goldForKill={gameData[this.state.playerLevel - 1].goldPerKill}
                xpPerKill={gameData[this.state.playerLevel - 1].xpPerKill}
                spreadButtonImage={
                  gameData[this.state.playerLevel - 1].spreadButtonImage
                }
                spreadButtonName={
                  gameData[this.state.playerLevel - 1].spreadButtonName
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={7} direction="column">
            <StatsBar
              currency={this.state.currency}
              growPerClick={this.state.growPerClick}
              growClickPerSecond={this.state.growClickPerSecond}
              spreadPerClick={this.state.spreadPerClick}
              spreadClickPerSecond={this.state.spreadClickPerSecond}
              income={this.state.income}
              playerLevel={this.state.playerLevel}
              currentXp={this.state.currentXp}
              xpToLevelUp={this.state.xpToLevelUp}
              xpProgress={this.state.currentXp / this.state.xpToLevelUp}
            />
            <Shop shopData={this.state.shopData} buyItem={this.buyItem} />
          </Grid>
          <Grid item xs={1} direction="column">
            <SpellBar
              activateSpell={this.activateSpell}
              spellData={this.state.spellData}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
