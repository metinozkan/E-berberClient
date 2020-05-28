import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import history from "./services/history";
import Routes from "./routes";
import GlobalStyles from "./styles/global";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import blueGrey from "@material-ui/core/colors/blueGrey";

const blueColor = blue.A600;
const blueGreyColor = blueGrey.A900;

const newTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#1e88e5",
    },
    secondary: {
      main: "#0d47a1",
    },
  },
});

function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={newTheme}>
        <Routes />
      </ThemeProvider>
      <GlobalStyles />
    </Router>
  );
}
export default App;
