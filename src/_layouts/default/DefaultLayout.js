import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Storage } from "../../Utils/Storage";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Menu,
  Button,
  Paper,
  useMediaQuery,
  IconButton,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import clsx from "clsx";
import Settings from "@material-ui/icons/Settings";
import AccountCircle from "@material-ui/icons/AccountCircle";
import StoreIcon from "@material-ui/icons/Store";
import styled from "styled-components";
import eBerberLogo from "../../Resources/Images/e-berber.png";
import { Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import { useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#f5f5f5",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Footer = () => {
  return (
    <Paper
      style={{
        height: "150px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      FOOOTER
    </Paper>
  );
};

const DrawerMenu = styled.div`
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  bottom: -48px;
  left: 0;
  transition: transform 0.3s ease-in-out;
 // height: ${({ open }) => (open ? "auto" : "0px")};
  opacity: ${({ open }) => (open ? "0.8" : "0")};
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(50)")};
`;

const DefaultLayout = (props) => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawer, setDrawer] = React.useState(null);

  const open = Boolean(anchorEl);
  // const [customer, setCustomer] = React.useState(Storage.GetItem("customer"));
  //const customer = Storage.GetItem("customer");
  const history = useHistory();
  const { path } = useRouteMatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleDrawerMenu = (event) => {
    setDrawer(event.currentTarget);
  };
  const handleDrawerClose = () => {
    setDrawer(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className={classes.root} style={{ height: "100%", width: "100%" }}>
        <AppBar
          position="static"
          style={{ width: "100%", position: "relative" }}
          color="white"
          elevation={1}
        >
          <Toolbar>
            <Link to="/" style={{ color: "black" }}>
              <img
                src={eBerberLogo}
                style={{ width: "50px", height: "50px", marginRight: "1em" }}
              ></img>
            </Link>

            {fullScreen ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography variant="h6" className={classes.title}>
                  {/* <Link to="/" style={{ color: "black" }}>
                 
                    E-Berber
                  </Link> */}
                  <Button>
                    <Link
                      to="/barbers"
                      style={{ marginLeft: "1em", color: "black" }}
                    >
                      Berberler
                    </Link>
                  </Button>
                </Typography>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={drawer}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={drawer}
                  onClose={handleDrawerClose}
                >
                  <MenuItem
                    onClick={() => {
                      if (props.customer) history.push("/profile");
                      else {
                        history.push("/login");
                      }
                      handleDrawerClose();
                    }}
                  >
                    {props.customer
                      ? props.customer.name + " " + props.customer.lastName
                      : "Giriş yap"}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDrawerClose();
                      if (props.customer) {
                        Storage.RemoveItem("customer");
                        history.push("/login");
                        props.setCustomer(false);
                      } else {
                        history.push("/signup");
                        props.setCustomer(false);
                      }
                    }}
                  >
                    {props.customer ? "Çıkış Yap" : "Üye ol"}
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <>
                <Typography variant="h6" className={classes.title}>
                  {/* E-Berber */}
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
                      Berberler
                    </Link>
                  </Button>
                </Typography>
                <div>
                  {props.customer ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ color: "black" }}>
                        {props.customer.name} {props.customer.lastName}
                      </div>
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
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() => {
                            history.push("/profile");
                            handleClose();
                          }}
                        >
                          Profil
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Randevularım</MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            Storage.RemoveItem("customer");
                            history.push("/login");
                            props.setCustomer(false);
                          }}
                        >
                          Çıkış Yap
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        style={{ marginRight: ".5em", padding: ".5em 1em" }}
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
                        color="primary"
                        style={{ padding: ".5em 1em" }}
                        className={classes.button}
                        // endIcon={<Icon>send</Icon>}
                        onClick={() => {
                          //            Router.push("/login");
                        }}
                      >
                        <Link to="/login" style={{ color: "white" }}>
                          Giriş Yap
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </>
            )}
          </Toolbar>
        </AppBar>
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 65px)",
            overflow: "auto",
            alignItems: "flex-start",
          }}
        >
          {props.children}
        </div>
        {/* {path.includes("login") || path.includes("signup") ? null : <Footer />} */}
      </div>
    </>
  );
};
export default DefaultLayout;
