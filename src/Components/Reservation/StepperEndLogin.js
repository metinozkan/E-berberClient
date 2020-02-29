import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const StepperEndLogin = () => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={10}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              component="h4"
              style={{ marginBottom: ".2em" }}
            >
              Giriş Yap
            </Typography>
            <TextField
              id="standard-basic"
              placeholder="E-Posta"
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
              color="secondary"
              // endIcon={<Icon>send</Icon>}
            >
              şifremi unuttum
            </Button>
            <Button
              variant="contained"
              color="secondary"
              // endIcon={<Icon>send</Icon>}
            >
              Giriş Yap
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default StepperEndLogin;
