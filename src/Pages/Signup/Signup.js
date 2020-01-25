import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const SignUp = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ marginTop: "10em" }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <Grid item xs={12}>
            <Typography
              variant="h2"
              component="h3"
              style={{ marginBottom: ".3em" }}
            >
              Üye Ol
            </Typography>
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
              className={classes.button}
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
export default SignUp;
//Ana iskeleti projeye dahil ettin layoutun bir kısmını yaptın
//stillendirme işliyor
//document js i incele
//server.js ve route.js eklemen lazım
