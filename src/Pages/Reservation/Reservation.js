import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import HourCalender from "../../Components/HourCalender";
import TextField from "@material-ui/core/TextField";

//signup Login
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
//ReservationDetailCard
import ReservationDetailCard from "../../Components/ReservationDetailCard/ReservationDetailCard";

//servicesList
import { ServicesList } from "../../Components/ServicesList";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
const isLogin = false;
function getSteps() {
  return ["Hizmet ", "Tarih ", "Randevu al"];
}

const getStepContent = (step, selectedService, setSelectLogin, selectLogin) => {
  switch (step) {
    case 0:
      return (
        <ServiceSection selectedService={selectedService}></ServiceSection>
      );
    case 1:
      return <Calender />;
    case 2:
      return isLogin == true ? (
        <div>Randevu bilgileri</div>
      ) : selectLogin == false ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <div>
            Üye girişi yapmak için{" "}
            <u
              onClick={() => {
                setSelectLogin(true);
              }}
            >
              Tıklayınız
            </u>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <StepperEndSign></StepperEndSign>
            <ReservationDetailCard />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}
        >
          <StepperEndLogin></StepperEndLogin>
          <ReservationDetailCard />
        </div>
      );
    default:
      return "Unknown step";
  }
};
const ServiceSection = ({ selectedService }) => {
  const [state, setState] = React.useState({
    age: "",
    name: "hai"
  });
  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };
  return (
    <div>
      <Card>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px"
          }}
        >
          <div>
            {selectedService.selectedServiceName} -
            {selectedService.selectedServiceTime}-
            {selectedService.selectedServicePrice}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FormControl
              className={"classes.formControl"}
              style={{ width: "12em", marginRight: ".5em" }}
            >
              <Select
                value={state.age}
                onChange={handleChange}
                className={"classes.selectEmpty"}
                variant="outlined"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" color="primary">
              Kaldır
            </Button>
          </div>
        </CardContent>
      </Card>
      <ServicesListModal></ServicesListModal>
    </div>
  );
};

const Calender = ({}) => {
  return <HourCalender></HourCalender>;
};

const Identification = ({}) => {
  return <div>Üyelik ::) veya randevunun son hali gözükecek </div>;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ServicesListModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{
          marginTop: "2em",
          marginBottom: "2em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onClick={handleClickOpen}
      >
        <Icon fontSize="small" style={{ marginRight: ".5em" }}>
          add_circle
        </Icon>
        Babacıımmmmmmmm hizmet eklee
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
          <ServicesList></ServicesList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
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
class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }
  VerticalLinearStepper = ({ selectedService }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(2);
    const [selectLogin, setSelectLogin] = React.useState(true);
    const steps = getSteps();

    const handleNext = () => {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>
                  {getStepContent(
                    index,
                    selectedService,
                    setSelectLogin,
                    selectLogin
                  )}
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  };

  render() {
    console.log("props", this.props.location.state);
    const selectedService = this.props.location.state;
    return (
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          marginTop: "1em"
        }}
      >
        <Grid
          container
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%"
          }}
        >
          <Grid item xs={12} sm={10} md={8}>
            <this.VerticalLinearStepper
              selectedService={selectedService}
            ></this.VerticalLinearStepper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Reservation;
