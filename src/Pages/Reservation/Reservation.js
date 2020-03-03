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
import ServicesListModal from "../../Components/Reservation/ServicesListModal";
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

const CalenderOrDetail = ({}) => {
  return <HourCalender></HourCalender>;
};
const ServiceSectionOrDetail = ({ selectedService, switchSelect = 1 }) => {
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
      isLogin: false,
      stepperActiveStep: 0,
      stepperSelectLogin: false,
      services: [{ name: "sac" }, { name: "sakals" }]
    };
  }

  _updateState = state => {
    this.setState(state);
  };

  setActiveStep = step => {
    this.setState({
      stepperActiveStep: step
    });
  };
  setSelectLogin = () => {
    this.setState({
      stepperSelectLogin: !this.state.stepperSelectLogin
    });
  };

  handleNext = () => {
    this.setActiveStep(this.state.stepperActiveStep + 1);
  };

  handleBack = () => {
    this.setActiveStep(this.state.stepperActiveStep - 1);
  };

  handleReset = () => {
    this.setActiveStep(0);
  };
  getSteps = () => {
    return ["Hizmet ", "Tarih ", "Randevu al"];
  };

  getStepContent = (step, selectedService, setSelectLogin, selectLogin) => {
    switch (step) {
      case 0:
        return (
          <>
            {this.state.services.map(s => (
              <ServiceSectionOrDetail
                selectedService={selectedService}
                serviceName={s.name}
              ></ServiceSectionOrDetail>
            ))}
            <ServicesListModal
              updateState={this._updateState}
              state={this.state}
            ></ServicesListModal>
          </>
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

  render() {
    const steps = this.getSteps();
    const activeStep = this.state.stepperActiveStep;
    const setSelectLogin = this.state.stepperSelectLogin;
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
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            style={{ width: "100%" }}
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                onClick={() => {
                  console.log("selam cukoos");
                }}
              >
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>
                    {this.getStepContent(
                      index,
                      selectedService,
                      this.setSelectLogin,
                      this.state.stepperSelectLogin
                    )}
                  </Typography>
                  <div>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
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
            <Paper square elevation={0}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </Paper>
          )}
        </Grid>
      </Grid>
    );
  }
}
export default Reservation;
