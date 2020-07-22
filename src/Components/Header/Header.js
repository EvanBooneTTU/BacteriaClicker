import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SaveIcon from "@material-ui/icons/Save";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContentText from "@material-ui/core/DialogContentText";
import HelpText from "./HelpText";

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#263238",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  statItem: {
    color: "#B7B7BB",
  },
  statItemAmount: {
    display: "inline",
    color: "#C58519",
  },
}));

const styles = (theme) => ({
  statRoot: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.StatRoot} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function Header(props) {
  const classes = useStyles();
  const [modalOpen, modalSetOpen] = React.useState(false);
  const [statOpen, statSetOpen] = React.useState(false);
  const [helpOpen, setHelpOpen] = React.useState(false);

  const modalHandleOpen = () => {
    modalSetOpen(true);
  };

  const modalHandleClose = () => {
    modalSetOpen(false);
  };

  const handleStatOpen = () => {
    statSetOpen(true);
  };
  const handleStatClose = () => {
    statSetOpen(false);
  };

  const handleHelpOpen = () => {
    setHelpOpen(true);
    props.helpButtonClick();
  };

  const handleHelpClose = () => {
    setHelpOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (helpOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [helpOpen]);
  return (
    <React.Fragment>
      <AppBar className={classes.AppBarRoot} position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            Bacteria Clicker
          </Typography>
          <ButtonGroup
            variant="text"
            aria-label="outlined button group"
            size="large"
          >
            <Button className={classes.buttonColors} onClick={handleStatOpen}>
              Stats
            </Button>
            <Button className={classes.buttonColors} onClick={modalHandleOpen}>
              New Game
            </Button>
            <Button
              className={classes.buttonColors}
              onClick={handleHelpOpen}
              style={{
                boxShadow: props.firstOpen ? "0 0 4px 3px red" : "",
              }}
            >
              Help
            </Button>
            <Button
              onClick={props.saveGame}
              className={classes.buttonColors}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={modalHandleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <h5 id="transition-modal-title" style={{ color: "white" }}>
              Are you sure you want to start a new game?
            </h5>
            <div
              id="transition-modal-description"
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "60px",
                paddingRight: "60px",
                color: "white",
              }}
            >
              <Button
                onClick={() => {
                  props.newGame();
                  modalHandleClose();
                }}
                variant="contained"
              >
                Yes
              </Button>
              <Button onClick={modalHandleClose} variant="contained">
                No
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Dialog
        onClose={handleStatClose}
        aria-labelledby="customized-dialog-title"
        open={statOpen}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleStatClose}
          style={{
            paddingLeft: "175px",
            color: "white",
            backgroundColor: "#131313",
          }}
        >
          Statistics
        </DialogTitle>
        {/*
        nutrientsCollected={this.state.nutrientsCollected}
        clickedNutrients={this.state.clickedNutrients}
        growClicks={this.state.growClicks}
        totalGrows={this.state.totalGrows}
        damageDealt={this.state.damageDealt}
        clickedDamage={this.state.clickedDamage}
        spreadClicks={this.state.spreadClicks}
        totalSpreads={this.state.totalSpreads}
        goldEarned={this.state.goldEarned}
        goldSpent={this.state.goldSpent}
        totalXp={this.state.totalXp}
        totalClicks={this.state.growClicks + this.state.spreadClicks}
        */}
        <DialogContent
          style={{
            width: "300px",
            paddingLeft: "130px",
            backgroundColor: "#1E272C",
            whiteSpace: "pre",
          }}
          dividers
        >
          <Typography gutterBottom className={classes.statItem}>
            Nutrients Collected{"   "}
            <div className={classes.statItemAmount}>
              {props.nutrientsCollected}
            </div>
          </Typography>
          <Typography
            style={{ paddingLeft: "16px" }}
            gutterBottom
            className={classes.statItem}
          >
            Clicked Nutrients{"   "}
            <div className={classes.statItemAmount}>
              {props.clickedNutrients}
            </div>
          </Typography>
          <Typography
            gutterBottom
            className={classes.statItem}
            style={{ paddingLeft: "54px" }}
          >
            Grow Clicks{"   "}
            <div className={classes.statItemAmount}>{props.growClicks}</div>
          </Typography>
          <Typography
            gutterBottom
            className={classes.statItem}
            style={{ paddingLeft: "16px" }}
          >
            Colonies Created{"   "}
            <div className={classes.statItemAmount}>{props.totalGrows}</div>
          </Typography>
          <Typography
            gutterBottom
            className={classes.statItem}
            style={{ paddingLeft: "38px" }}
          >
            Damage Dealt{"   "}
            <div className={classes.statItemAmount}>{props.damageDealt}</div>
          </Typography>
          <Typography
            gutterBottom
            className={classes.statItem}
            style={{ paddingLeft: "22px" }}
          >
            Clicked Damage{"   "}
            <div className={classes.statItemAmount}>{props.clickedDamage}</div>
          </Typography>
          <Typography
            gutterBottom
            className={classes.statItem}
            style={{ paddingLeft: "40px" }}
          >
            Spread Clicks{"   "}
            <div className={classes.statItemAmount}>{props.spreadClicks}</div>
          </Typography>
          <Typography gutterBottom className={classes.statItem}>
            Countries Defeated{"   "}
            <div className={classes.statItemAmount}>{props.totalSpreads}</div>
          </Typography>
          <Typography
            gutterBottom
            className={classes.statItem}
            style={{ paddingLeft: "51px" }}
          >
            Gold Earned{"   "}
            <div className={classes.statItemAmount}>{props.goldEarned}</div>
          </Typography>
          <Typography
            gutterBottom
            className={classes.statItem}
            style={{ paddingLeft: "60px" }}
          >
            Gold Spent{"   "}
            <div className={classes.statItemAmount}>{props.goldSpent}</div>
          </Typography>
          <Typography
            gutterBottom
            className={classes.statItem}
            style={{ paddingLeft: "6px" }}
          >
            Experience Earned{"   "}
            <div className={classes.statItemAmount}>{props.totalXp}</div>
          </Typography>
          <Typography
            gutterBottom
            className={classes.statItem}
            style={{ paddingLeft: "56px" }}
          >
            Total Clicks{"   "}
            <div className={classes.statItemAmount}>{props.totalClicks}</div>
          </Typography>
        </DialogContent>
      </Dialog>
      <Dialog
        open={helpOpen}
        onClose={handleHelpClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleHelpClose}
          style={{
            paddingLeft: "455px",
            color: "white",
            backgroundColor: "#131313",
          }}
        >
          Help
        </DialogTitle>
        <DialogContent dividers={true} style={{ backgroundColor: "#1E272C" }}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <HelpText />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
