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
    this.saveGame = this.saveGame.bind(this);
    this.initialItemPurchaseCost = this.initialItemPurchaseCost.bind(this);
    this.activateSpell = this.activateSpell.bind(this);
    this.checkLevelUp = this.checkLevelUp.bind(this);

    this.state = {
      currency: 1000000000,
      growPerClick: 1, //Is == to infectability DONE
      spreadPerClick: 5, //Is == to growthFactor DONE
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
      time: 0,
      autoSave: false,
      totalXp: 0,
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
        objectCopy.totalXp += gameData[prevState.playerLevel - 1].xpPerKill;
        objectCopy.spreadMaxValue +=
          gameData[prevState.playerLevel - 1].hpIncreasePerKill;
        objectCopy.currency += gameData[prevState.playerLevel - 1].goldPerKill;
      }
      return objectCopy;
    });
    this.checkLevelUp();
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
      //also sets time due to occuring every 1 second
      objectCopy.time += 1;

      objectCopy.spellData.forEach((spell) => {
        spell.cooldownTimer -= 1;
        spell.activeTime -= 1;
        if (spell.cooldownTimer <= 0) {
          spell.onCooldown = false;
        }
        if (spell.activeTime <= 0) {
          spell.active = false;
        }
      });
      objectCopy.spellData[0].spellDamage = objectCopy.totalXp / 10;
      objectCopy.spellData[3].spellDamage = Math.floor(
        this.state.totalGrows / 10
      );

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

  initialItemPurchaseCost() {
    this.setState((prevState) => {
      let objectCopy = Object.assign({}, prevState);
      objectCopy.shopData.forEach((item) => {
        console.log(item.index);
        objectCopy.shopData[item.index].price = this.calculatePurchaseCost(
          1,
          item.index
        );
        console.log("purchase cost: " + objectCopy.shopData[item.index].price);
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
  }

  componentDidMount() {
    //Grabs saved values in local storage
    this.setState(
      (prevState) => {
        let objectCopy = Object.assign({}, prevState);

        Object.keys(localStorage).forEach((key, index) => {
          objectCopy[key] = JSON.parse(localStorage.getItem(key));
        });

        return objectCopy;
      },
      () => {
        this.initialItemPurchaseCost();
      }
    );

    this.intervalID = setInterval(() => this.passiveButtonClicks(), 1000);
    if (this.state.autoSave) {
      this.intervalID = setInterval(() => this.saveGame(), 60000);
    }

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
        this.setState((prevState) => {
          let objectCopy = Object.assign({}, prevState);
          objectCopy.spreadCurrentValue += objectCopy.spellData[0].spellDamage;
          objectCopy.spreadButtonProgress =
            objectCopy.spreadCurrentValue / objectCopy.spreadMaxValue;
          if (objectCopy.spreadButtonProgress >= 1.0) {
            objectCopy.totalSpreads++;
            objectCopy.spreadButtonProgress = 0;
            objectCopy.spreadCurrentValue = 0;
            objectCopy.currentXp +=
              gameData[prevState.playerLevel - 1].xpPerKill;
            objectCopy.totalXp += gameData[prevState.playerLevel - 1].xpPerKill;
            objectCopy.spreadMaxValue +=
              gameData[prevState.playerLevel - 1].hpIncreasePerKill;
            objectCopy.currency +=
              gameData[prevState.playerLevel - 1].goldPerKill;
          }
          return objectCopy;
        });
        this.checkLevelUp();
        break;
      case 1:
        let newSpellData1 = [...this.state.spellData];
        newSpellData1[index].activeTime = 10;
        this.setState((prevState) => ({
          growPerClick: this.state.growPerClick * 2,
          spellData: newSpellData1,
        }));
        setTimeout(
          function () {
            this.setState({
              growPerClick: this.state.growPerClick / 2,
            });
          }.bind(this),
          10000
        );

        break;
      case 2:
        let newSpellData2 = [...this.state.spellData];
        newSpellData2[index].activeTime = 7;
        this.setState({
          growPerClick: this.state.growPerClick * 5,
          spellData: newSpellData2,
        });
        setTimeout(
          function () {
            this.setState({
              growPerClick: this.state.growPerClick / 5,
            });
          }.bind(this),
          7000
        );
        break;
      case 3:
        let growsAdded = Math.floor(this.state.totalGrows / 10);
        this.setState((prevState) => {
          let objectCopy = Object.assign({}, prevState);
          objectCopy.totalGrows += growsAdded;
          objectCopy.spreadPerClick += growsAdded * 2;
          return objectCopy;
        });
        break;
      case 4:
        this.setState((prevState) => {
          let objectCopy = Object.assign({}, prevState);
          objectCopy.spellData.forEach((spell) => {
            spell.cooldownTimer = 0;
            spell.onCooldown = false;
          });
          return objectCopy;
        });
        break;
      case 5:
        let newSpellData5 = [...this.state.spellData];
        newSpellData5[index].activeTime = 10;
        this.setState({
          spreadPerClick: this.state.spreadPerClick * 2,
          spellData: newSpellData5,
        });
        setTimeout(
          function () {
            this.setState({
              spreadPerClick: this.state.spreadPerClick / 2,
            });
          }.bind(this),
          10000
        );
        break;
      default:
        break;
    }
    this.setState((prevState) => {
      let objectCopy = Object.assign({}, prevState);
      if (index === 1 || index === 2 || index === 5) {
        objectCopy.spellData[index].active = true;
      }
      objectCopy.spellData[index].cooldownTimer =
        objectCopy.spellData[index].cooldown;
      objectCopy.spellData[index].onCooldown = true;
      return objectCopy;
    });
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

  saveGame() {
    Object.keys(this.state).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header saveGame={this.saveGame} />
          </Grid>
          <Grid item container xs={4} direction="row" className={classes.test}>
            <Grid container item>
              <GrowButton
                onClick={this.growButtonClick}
                progress={this.state.growButtonProgress}
                max={this.state.growMaxValue}
                current={this.state.growCurrentValue}
                total={this.state.totalGrows}
                growPerClick={this.state.growPerClick}
              />
              <SpreadButton
                onClick={this.spreadButtonClick}
                progress={1 - this.state.spreadButtonProgress}
                max={this.state.spreadMaxValue}
                current={this.state.spreadCurrentValue}
                total={this.state.totalSpreads}
                spreadPerClick={this.state.spreadPerClick}
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
              time={this.state.time}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
