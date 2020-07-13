import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SaveIcon from "@material-ui/icons/Save";
import MenuIconDrawer from "./MenuIconDrawer";

const useStyles = makeStyles((theme) => ({
  AppBarRoot: {
    flexGrow: 1,
    height: "45px",
    backgroundColor: "#131313",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    minWidth: "125px",
  },
  buttonColors: {
    color: "white",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.AppBarRoot} position="static">
      <Toolbar variant="dense">
        <MenuIconDrawer />
        <Typography variant="h6" className={classes.title}>
          Covid Clicker
        </Typography>
        <ButtonGroup
          variant="text"
          aria-label="outlined button group"
          size="large"
        >
          <Button className={classes.buttonColors}>Stats</Button>
          <Button className={classes.buttonColors}>Other</Button>
          <Button className={classes.buttonColors}>Help</Button>
          <Button className={classes.buttonColors} startIcon={<SaveIcon />}>
            Save
          </Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
