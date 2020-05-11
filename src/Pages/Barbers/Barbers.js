import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SearchInput } from "./components/SearchInput";
import { BarberCard } from "./components/BarberCard";
import MapComp from "./components/MapComp";
import { Typography, Grid } from "@material-ui/core";

//import imageMahmut from "../../public/mahmut.jpg";

const Barbers = () => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={8}>
        <Typography gutterBottom variant="h4" component="h2">
          Sakarya Berber
        </Typography>
        <SearchInput />
      </Grid>

      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-star"
      >
        <Grid item xs={8} style={{ marginTop: "2em" }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <BarberCard></BarberCard>
            </Grid>
            <Grid item xs={12}>
              <BarberCard></BarberCard>
            </Grid>{" "}
            <Grid item xs={12}>
              <BarberCard></BarberCard>
            </Grid>{" "}
            <Grid item xs={12}>
              <BarberCard></BarberCard>
            </Grid>{" "}
            <Grid item xs={12}>
              <BarberCard></BarberCard>
            </Grid>{" "}
            <Grid item xs={12}>
              <BarberCard></BarberCard>
            </Grid>{" "}
            <Grid item xs={12}>
              <BarberCard></BarberCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} style={{ marginTop: "2em" }}>
          <MapComp />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Barbers;
