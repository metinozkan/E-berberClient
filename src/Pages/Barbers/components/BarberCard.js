import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Grid,
  IconButton,
  Paper,
  ButtonBase,
} from "@material-ui/core";
import { LocationOnSharp } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
}));

export const BarberCard = ({ barber }) => {
  const classes = useStyles();
  const imageMahmut = "";
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={barber.photo} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {barber.barberName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {barber.district}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {barber.adress}
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
                  <Link
                    to={`/barberdetail/${barber.id}`}
                    style={{ color: "black" }}
                  >
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
