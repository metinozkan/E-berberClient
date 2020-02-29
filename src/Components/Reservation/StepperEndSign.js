import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const StepperEndSign = () => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="h4"
          style={{ marginBottom: ".2em" }}
        >
          Üye Ol
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              placeholder="İsim"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "1em" }}
            ></TextField>
            <TextField
              id="standard-basic"
              placeholder="Soyisim"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "1em" }}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              placeholder="E-posta"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "1em" }}
            ></TextField>
            <TextField
              id="standard-basic"
              placeholder="Şifre"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "1em" }}
            ></TextField>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              color="secondary"
              // endIcon={<Icon>send</Icon>}
            >
              Kaydol
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default StepperEndSign;
