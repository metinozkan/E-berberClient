import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
//import imageMahmut from "../../public/mahmut.jpg";
import { LocationOnSharp } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import { LocationCity } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600
  },
  image: {
    width: 180,
    height: 180,
    marginRight: "1em"
  },
  img: {
    margin: "auto",
    display: "block",
    width: 250,
    height: 180,
    maxWidth: "100%",
    maxHeight: "100%"
  },
  rootSearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  inputSearch: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButtonSearch: {
    padding: 10
  },
  dividerSearch: {
    height: 28,
    margin: 4,
    color: "black"
  }
}));

const BarberCard = () => {
  const classes = useStyles();
  const imageMahmut = "";
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={imageMahmut} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Kuaför Mahmut
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Sakaryanın yerliisii
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  no:208 çark cad.
                </Typography>
              </Grid>
              <Grid item style={{ textAlign: "right" }}>
                <Button size="small" color="secondary">
                  İncele
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => {
                    //  Router.push("/barberdetail");
                  }}
                >
                  <Link to="/barberdetail" style={{ color: "black" }}>
                    Randevu Al
                  </Link>
                </Button>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  size="small"
                >
                  <LocationOnSharp />
                </IconButton>
              </Grid>
            </Grid>
            {/* <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid> */}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const SearchInput = () => {
  const classes = useStyles();
  return (
    <div style={{ width: "50%" }}>
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
    </div>
  );
};
const Barbers = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={8}>
        <Typography gutterBottom variant="h4" component="h2">
          Sakarya Berber
        </Typography>
        <SearchInput />
      </Grid>

      <Grid item xs={12} style={{ marginTop: "2em" }}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <BarberCard></BarberCard>
          </Grid>
          <Grid item xs={8}>
            <BarberCard></BarberCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Barbers;
