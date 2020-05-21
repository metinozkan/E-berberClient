import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Background from "../../Resources/Images/bgberber.jpg";
import Typography from "@material-ui/core/Typography";
import { StoreMallDirectory, Navigation, Search } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        style={{
          backgroundImage: `url(${Background} )`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: "1",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100vh",
            backgroundColor: "#e2e2e2",
            opacity: "0.5",
          }}
        ></div>
        <Grid item xs={2}></Grid>
        <Grid item xs={12} md={6} style={{ zIndex: "1" }}>
          <Grid container>
            <Grid item xs={12} style={{ marginBottom: "1em" }}>
              <Typography
                variant="h2"
                component="h3"
                style={{ marginBottom: ".3em" }}
              >
                Aradığın Hizmet Burada
              </Typography>
              <Typography variant="h5" component="h3">
                Sade - Kolay -Hızlı randevu
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper
              component="form"
              style={{
                padding: "2px 4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item xs={6}>
                <TextField
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  label="Dükkan ara"
                  style={{ flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StoreMallDirectory />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  label="Konuma Göre"
                  style={{ flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Navigation />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <Search />
                </IconButton>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
        {/* <Grid item xs={6}>
          <img src={require("../public/berber.jpg")}></img>
        </Grid> */}
      </Grid>
    </>
  );
};

export default Home;
