import React, { useState } from "react";
import { Agent, Storage, Loading } from "../../Utils/importFiles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const StepperEndSign = ({ setStepperLoginOrSignUp, setCustomerIsLogin }) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const [eMail, seteMail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form className={classes.form} noValidate>
      {isLoading && <Loading></Loading>}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="İsim"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            value={lastName}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            required
            fullWidth
            id="lastName"
            label="Soyisim"
            name="lastName"
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            value={eMail}
            onChange={(e) => {
              seteMail(e.target.value);
            }}
            required
            fullWidth
            id="email"
            label="E-posta"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="Bilgilendirme ve promosyon e-postası almak istirem"
          />
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => {
          console.log("add customer", {
            name: firstName,
            lastName: lastName,
            eMail: eMail,
            password: password,
          });
          setIsLoading(true);
          Agent.Customers.addCustomer()
            .send({
              name: firstName,
              lastName: lastName,
              eMail: eMail,
              password: password,
            })
            .then((res) => {
              if (res.ok) {
                setIsLoading(false);
                console.log("signUp succesfuly");
                Storage.SetItem("customer", {
                  id: res.body.id,
                  name: res.body.name,
                  lastName: res.body.lastName,
                  eMail: res.body.eMail,
                });
                setCustomerIsLogin({ ...res.body, password: "***" });
              }
            });
        }}
      >
        Üye Ol
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link
            variant="body2"
            onClick={() => {
              setStepperLoginOrSignUp();
            }}
            style={{ cursor: "pointer" }}
          >
            Zaten hesabın var mı? Giriş Yap
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
export default StepperEndSign;
