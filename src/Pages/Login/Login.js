// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import React from "react";
// const useStyles = makeStyles(theme => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: 200
//     }
//   }
// }));

// const Login = () => {
//   const classes = useStyles();
//   return (
//     <Grid
//       container
//       direction="row"
//       justify="center"
//       alignItems="center"
//       style={{ marginTop: "10em" }}
//     >
//       <Grid item xs={12} sm={6} md={4}>
//         <Grid
//           container
//           direction="row"
//           justify="flex-end"
//           alignItems="flex-end"
//         >
//           <Grid item xs={12}>
//             <Typography
//               variant="h2"
//               component="h3"
//               style={{ marginBottom: ".3em" }}
//             >
//               Giriş Yap
//             </Typography>
//             <TextField
//               id="standard-basic"
//               placeholder="E-Posta"
//               variant="outlined"
//               fullWidth
//               style={{ marginBottom: "1em" }}
//             ></TextField>
//             <TextField
//               id="standard-basic"
//               placeholder="Şifre"
//               variant="outlined"
//               fullWidth
//               style={{ marginBottom: "1em" }}
//             ></TextField>
//           </Grid>
//           <Grid
//             container
//             direction="row"
//             justify="space-between"
//             alignItems="flex-end"
//           >
//             <Button
//               color="secondary"
//               className={classes.button}
//               // endIcon={<Icon>send</Icon>}
//             >
//               şifremi unuttum
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               className={classes.button}
//               // endIcon={<Icon>send</Icon>}
//             >
//               Giriş Yap
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };
// export default Login;
// //Ana iskeleti projeye dahil ettin layoutun bir kısmını yaptın
// //stillendirme işliyor
// //document js i incele
// //server.js ve route.js eklemen lazım
import React from "react";
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

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default Login;
