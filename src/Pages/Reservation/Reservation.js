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

import HourCalender from "../../Components/HourCalender";
import TextField from "@material-ui/core/TextField";

//signup Login
import StepperEndSign from "../../Components/Reservation/StepperEndSign";
import StepperEndLogin from "../../Components/Reservation/StepperEndLogin";
//ReservationDetailCard
import ReservationDetailCard from "../../Components/Reservation/ReservationDetailCard";

//serviceSectiın
import ServiceSection from "../../Components/Reservation/ServiceSection";
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
        <ServiceSectionOrDetail
          selectedService={selectedService}
        ></ServiceSectionOrDetail>
      );
    case 1:
      return <CalenderOrDetail />;
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
const CalenderOrDetail = ({}) => {
  return <HourCalender></HourCalender>;
};
const ServiceSectionOrDetail = ({ selectedService, switchSelect }) => {
  return switchSelect == 1 ? (
    <ServiceSection selectedService={selectedService}></ServiceSection>
  ) : (
    <ReservationDetailCard></ReservationDetailCard>
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
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectLogin, setSelectLogin] = React.useState(false);
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
      <Grid
        container
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%"
        }}
      >
        <Grid
          item
          md={8}
          sm={10}
          xs={12}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start"
          }}
        >
          <this.VerticalLinearStepper
            selectedService={selectedService}
          ></this.VerticalLinearStepper>
        </Grid>
      </Grid>
    );
  }
}
export default Reservation;
