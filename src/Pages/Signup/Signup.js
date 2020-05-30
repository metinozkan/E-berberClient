import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Agent, Storage } from "../../Utils/importFiles";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

const SignUp = (props) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const [eMail, seteMail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const customer = Storage.GetItem("customer");
  return !customer ? (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Üye Ol
        </Typography>
        <form className={classes.form} noValidate>
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
                label="First Name"
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
                label="Last Name"
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
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              console.log("signUp,", {
                name: firstName,
                lastName: lastName,
                eMail: eMail,
                password: password,
              });

              Agent.Customers.addCustomer()
                .send({
                  name: firstName,
                  lastName: lastName,
                  eMail: eMail,
                  password: password,
                })
                .then((res) => {
                  console.log("rRESS", res);
                  if (res.ok) {
                    if (!res.body.Error) {
                      console.log("signUp succesfuly");
                      Storage.SetItem("customer", {
                        id: res.body.id,
                        name: res.body.name,
                        lastName: res.body.lastName,
                        eMail: res.body.eMail,
                      });
                      props.setCustomer({
                        ...res.body,
                        password: "****",
                      });
                      history.push("/");
                    } else {
                      console.log("hata", res.body.Message);
                    }
                  }
                });
            }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  ) : (
    <Redirect to="/" />
  );
};
export default SignUp;
