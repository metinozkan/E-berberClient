import React, { useState } from "react";
import { Agent, Loading, Storage } from "../../Utils/importFiles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const StepperEndLogin = ({ setStepperLoginOrSignUp, setCustomerIsLogin }) => {
  const classes = useStyles();
  const [eMail, seteMail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  return (
    <form className={classes.form} noValidate>
      {isLoading && <Loading></Loading>}{" "}
      <ConfirmModal
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
        confirmMesage={"Tamam"}
        modalContent={modalContent}
      />
      <TextField
        variant="outlined"
        value={eMail}
        onChange={(e) => {
          seteMail(e.target.value);
        }}
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-posta"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Şifre"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Beni hatırla"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => {
          if (password && eMail) {
            setIsLoading(true);
            Agent.Customers.login()
              .send({
                eMail: eMail,
                password: password,
              })
              .then((res) => {
                if (res.ok) {
                  if (!res.body.Error) {
                    setIsLoading(false);
                    Storage.SetItem("customer", {
                      ...res.body.data,
                      password: "****",
                    });
                    setCustomerIsLogin({ ...res.body.data, password: "***" });
                  } else {
                    setOpenConfirmModal(true);
                    setIsLoading(false);
                    setModalContent(res.body.Message);
                    console.log("hata", res.body.Message);
                  }
                }
              });
          }
        }}
      >
        Giriş Yap
      </Button>
      <Grid container>
        <Grid item xs>
          <Link
            //href="#"
            variant="body2"
          >
            Şifremi unuttum
          </Link>
        </Grid>
        <Grid item>
          <Link
            // href="#"
            variant="body2"
            onClick={() => {
              setStepperLoginOrSignUp();
            }}
            style={{ cursor: "pointer" }}
          >
            {"Üye Ol"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
export default StepperEndLogin;
