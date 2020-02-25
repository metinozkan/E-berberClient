import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Footer = () => {
  return <Paper style={{ height: "150px" }}></Paper>;
};

const DefaultLayout = props => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={classes.root} style={{}}>
        <AppBar position="static" style={{}}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Typography variant="h6" className={classes.title}>
              E-Berber
              <Button
                style={{ marginLeft: "1em" }}
                onClick={() => {
                  //Router.push("/");
                }}
              >
                <Link to="/" style={{ color: "black" }}>
                  Anasayfa
                </Link>
              </Button>
              <Button
                onClick={() => {
                  //    Router.push("/barbers");
                }}
              >
                <Link to="/barbers" style={{ color: "black" }}>
                  Barberler
                </Link>
              </Button>
            </Typography>

            {auth ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button
                  variant="outlined"
                  style={{ marginRight: ".5em" }}
                  onClick={() => {
                    //     Router.push("/signup");
                  }}
                >
                  <Link to="/signup" style={{ color: "black" }}>
                    Üye ol
                  </Link>
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  // endIcon={<Icon>send</Icon>}
                  onClick={() => {
                    //            Router.push("/login");
                  }}
                >
                  <Link to="/login">Giriş Yap</Link>
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {props.children}
        </div>
        <Footer />
      </div>
    </>
  );
};
export default DefaultLayout;
