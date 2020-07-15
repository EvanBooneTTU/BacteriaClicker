import React, { Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Tooltip from "@material-ui/core/Tooltip";
var numeral = require("numeral");

const styles = (theme) => ({
  root: {
    paddingLeft: "5px",
    height: "160px",
    backgroundColor: "#171c1e",
    minWidth: "400px",
  },
  lockedItem: {
    color: "#45494B",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    maxHeight: 100,
    maxWidth: 100,
    width: "100%",
    height: "100%",
    float: "left",
    marginLeft: "-16px",
    border: "0px",
    padding: "0px",
  },
  buttonGroup: {
    paddingTop: "4px",
  },
  button: {
    color: "white",
    backgroundColor: "#263238",
    marginRight: "10px",
  },
  coinIcon: {
    height: 19,
    width: 19,
    paddingRight: "5px",
  },
  inline: {
    fontSize: 13,
    color: "white",
  },
  divider: {
    height: "1px",
    backgroundColor: "#0f0f0f",
  },
});

const ItemTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#171C1E",
    color: "#86806C",
    fontSize: 14,
  },
  arrow: {
    color: "#171C1E",
  },
}))(Tooltip);

const MultiBuyTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#263238",
    color: "#86806C",
    fontSize: 10,
    width: "62px",
    height: "16px",
  },
  arrow: {
    color: "#263238",
  },
}))(Tooltip);

class ShopItem extends React.Component {
  render() {
    const { classes } = this.props;

    function checkDivider(props) {
      const divider = props.divider;
      if (divider) {
        return (
          <Divider
            className={classes.divider}
            variant="fullWidth"
            component="li"
          />
        );
      }
    }
    if (this.props.itemUnlocked) {
      return (
        <div className={classes.root}>
          <ButtonGroup
            className={classes.buttonGroup}
            aria-label="outlined primary button group"
          >
            <Button
              className={classes.button}
              onClick={() => this.props.buyItem(1, this.props.id)}
            >
              <Avatar
                variant="square"
                alt="coins"
                src="./Images/coins.png"
                className={classes.coinIcon}
              />
              <div style={{ paddingRight: "19px" }}>
                {this.props.price.toFixed(0)}
              </div>
            </Button>
            <MultiBuyTooltip
              arrow
              title={
                <div>
                  <Avatar
                    variant="square"
                    alt="coins"
                    src="./Images/coins.png"
                    style={{
                      width: "12px",
                      height: "12px",
                      float: "left",
                      paddingRight: "5px",
                    }}
                  />
                  <h2
                    style={{
                      margin: "0px",
                      position: "relative",
                      fontSize: "12",
                    }}
                  >
                    {numeral(this.props.price10).format("0.0a")}
                  </h2>
                </div>
              }
              placement="top"
            >
              <Button
                className={classes.button}
                onClick={() => this.props.buyItem(10, this.props.id)}
              >
                +10
              </Button>
            </MultiBuyTooltip>
            <MultiBuyTooltip
              arrow
              title={
                <div>
                  <Avatar
                    variant="square"
                    alt="coins"
                    src="./Images/coins.png"
                    style={{
                      width: "12px",
                      height: "12px",
                      float: "left",
                      paddingRight: "5px",
                    }}
                  />
                  <h2
                    style={{
                      margin: "0px",
                      position: "relative",
                      fontSize: "12",
                    }}
                  >
                    {numeral(this.props.price100).format("0.0a")}
                  </h2>
                </div>
              }
              placement="top"
            >
              <Button
                className={classes.button}
                onClick={() => this.props.buyItem(100, this.props.id)}
              >
                +100
              </Button>
            </MultiBuyTooltip>
            <MultiBuyTooltip
              arrow
              title={
                <div>
                  <Avatar
                    variant="square"
                    alt="coins"
                    src="./Images/coins.png"
                    style={{
                      width: "12px",
                      height: "12px",
                      float: "left",
                      paddingRight: "5px",
                    }}
                  />
                  <h2
                    style={{
                      margin: "0px",
                      position: "relative",
                      fontSize: "12",
                    }}
                  >
                    {numeral(this.props.price1000).format("0.0a")}
                  </h2>
                </div>
              }
              placement="top"
            >
              <Button
                className={classes.button}
                onClick={() => this.props.buyItem(1000, this.props.id)}
              >
                +1000
              </Button>
            </MultiBuyTooltip>
          </ButtonGroup>
          <ListItem>
            <ItemTooltip arrow title={this.props.itemName} placement="left">
              <Avatar
                className={classes.avatar}
                variant="circle"
                alt={this.props.alt}
                src={this.props.src}
              />
            </ItemTooltip>
            <ListItemText
              primary={
                <div
                  style={{
                    borderRight: "1px solid black",
                    width: "135px",
                    paddingLeft: "10px",
                  }}
                >
                  <Typography
                    display="block"
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    style={{
                      color: this.props.growthFactor === 0 ? "gray" : "white",
                    }}
                  >
                    Growth Factor {this.props.growthFactor}
                  </Typography>
                  <Typography
                    display="block"
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    style={{
                      color:
                        this.props.growthPerSecond === 0 ? "gray" : "white",
                    }}
                  >
                    Grow Rate {this.props.growthPerSecond}
                  </Typography>
                  <Typography
                    display="block"
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    style={{
                      color: this.props.infectability === 0 ? "gray" : "white",
                    }}
                  >
                    Infectability {this.props.infectability}
                  </Typography>
                  <Typography
                    display="block"
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    style={{
                      color:
                        this.props.spreadPerSecond === 0 ? "gray" : "white",
                    }}
                  >
                    Spread Rate {this.props.spreadPerSecond}
                  </Typography>
                  <Typography
                    display="block"
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    style={{
                      color: this.props.income === 0 ? "gray" : "white",
                    }}
                  >
                    Income {this.props.income}
                  </Typography>
                </div>
              }
            />
            <div style={{ marginTop: "40px", minWidth: "42px" }}>
              <Typography
                display="inline"
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                Rank {this.props.amount}
              </Typography>
            </div>
          </ListItem>
          {checkDivider(this.props)}
        </div>
      );
    } else {
      return (
        <Fragment>
          <div className={classes.root}>
            <Typography
              className={classes.lockedItem}
              variant="h5"
              gutterBottom
            >
              <LockIcon style={{ fontSize: "23px" }} fontSize="inherit" />
              Level {this.props.levelToUnlock}
            </Typography>
          </div>
          {checkDivider(this.props)}
        </Fragment>
      );
    }
  }
}

export default withStyles(styles)(ShopItem);
