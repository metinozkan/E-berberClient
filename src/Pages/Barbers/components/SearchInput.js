import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputBase,
  CardMedia,
  Button,
  Typography,
  Grid,
  IconButton,
  Paper,
  ButtonBase,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import { LocationCity } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
  },
  image: {
    width: 180,
    height: 180,
    marginRight: "1em",
  },
  img: {
    margin: "auto",
    display: "block",
    width: 250,
    height: 180,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  rootSearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  inputSearch: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButtonSearch: {
    padding: 10,
  },
  dividerSearch: {
    height: 28,
    margin: 4,
    color: "black",
  },
}));
export const SearchInput = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6}>
      <Paper component="form" className={classes.rootSearch}>
        <SearchIcon style={{ marginRight: "1em" }} />
        <InputBase
          className={classes.input}
          placeholder="Hizmet Ara"
          inputProps={{ "aria-label": "Hizmet Ara" }}
        />
        <Divider orientation="vertical" style={{ height: "28px" }} />
        <LocationCity style={{ marginLeft: "1em", marginRight: "1em" }} />
        <InputBase
          className={classes.input}
          placeholder="Konum ara"
          inputProps={{ "aria-label": "Konum ara" }}
        />
        <Button variant="contained" color="secondary">
          <Typography component="h2" style={{ marginRight: ".5em" }}>
            Ara
          </Typography>
          <SearchIcon />
        </Button>
      </Paper>
    </Grid>
  );
};
