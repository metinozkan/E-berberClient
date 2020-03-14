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
const ServiceSectionOrDetail = ({
  selectedService,
  switchSelect = 1,
  updateState,
  state
}) => {
  return switchSelect == 1 ? (
    <ServiceSection
      selectedService={selectedService}
      updateState={updateState}
      state={state}
    ></ServiceSection>
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
      selectedServices: props.location.state.services,
      selectedWorker: false,
      selectedDate: false,
      reservationObject: { serviceName: "", workerName: "", time: "" },
      stepTwoActive: true,
      stepThreeActive: false,
      showServiceDetailCard: true,
      showDateDetailCard: false
    };
  }

  _updateState = state => {
    this.setState(state);
  };
  _updateSelectedServices = service => {
    let array = this.state.selectedServices;
    array.push(service);
    this.setState({
      selectedServices: array
    });
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
  // getSteps = () => {
  //   return ["Hizmet ", "Tarih ", "Randevu al"];
  // };

  // getStepContent = (step, selectedServices, setSelectLogin, selectLogin) => {
  //   switch (step) {
  //     case 0:
  //       return (
  //         <>
  //           {this.state.selectedServices &&
  //             this.state.selectedServices.map(service => (
  //               <ServiceSectionOrDetail
  //                 selectedService={service}
  //                 updateState={this._updateState}
  //                 state={this.state}
  //               ></ServiceSectionOrDetail>
  //             ))}
  //           <ServicesListModal
  //             updateState={this._updateState}
  //             updateSelectedServices={this._updateSelectedServices}
  //             state={this.state}
  //             handleNextStepper={this.handleNext}
  //           ></ServicesListModal>
  //         </>
  //       );
  //     case 1:
  //       return <CalenderOrDetail />;
  //     case 2:
  //       return isLogin == true ? (
  //         <div>Randevu bilgileri</div>
  //       ) : selectLogin == false ? (
  //         <div
  //           style={{
  //             display: "flex",
  //             flexDirection: "column",
  //             justifyContent: "center"
  //           }}
  //         >
  //           <div>
  //             Üye girişi yapmak için{" "}
  //             <u
  //               onClick={() => {
  //                 setSelectLogin(true);
  //               }}
  //             >
  //               Tıklayınız
  //             </u>
  //           </div>
  //           <div
  //             style={{
  //               display: "flex",
  //               flexDirection: "row",
  //               justifyContent: "center"
  //             }}
  //           >
  //             <StepperEndSign></StepperEndSign>
  //           </div>
  //         </div>
  //       ) : (
  //         <div
  //           style={{
  //             display: "flex",
  //             flexDirection: "row",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             width: "100%"
  //           }}
  //         >
  //           <StepperEndLogin></StepperEndLogin>
  //           <ReservationDetailCard />
  //         </div>
  //       );
  //     default:
  //       return "Unknown step";
  //   }
  // };

  render() {
    console.log("ne var abi state de ", this.state);
    //const steps = this.getSteps();
    const activeStep = this.state.stepperActiveStep;
    const setSelectLogin = this.state.stepperSelectLogin;
    const open = true;
    console.log("secilen calisan", this.state.selectedServices.length);
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
          md={6}
          sm={8}
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
            <Step key={1} active={true}>
              <StepLabel>Hizmet</StepLabel>
              <StepContent>
                <Typography>
                  {this.state.showServiceDetailCard == false
                    ? this.state.selectedServices &&
                      this.state.selectedServices.map(service => (
                        <ServiceSection
                          selectedService={service}
                          updateState={this._updateState}
                          state={this.state}
                        ></ServiceSection>
                      ))
                    : this.state.selectedServices &&
                      this.state.selectedServices.map(service => (
                        <ReservationDetailCard
                          name={service.name}
                          price={service.price}
                          time={service.time}
                        ></ReservationDetailCard>
                      ))}
                  <ServicesListModal
                    updateState={this._updateState}
                    updateSelectedServices={this._updateSelectedServices}
                    state={this.state}
                    handleNextStepper={this.handleNext}
                  ></ServicesListModal>
                </Typography>
              </StepContent>
            </Step>
            <Step key={2} active={this.state.stepTwoActive}>
              <StepLabel>Tarih</StepLabel>
              <StepContent>
                <Typography>
                  {this.state.selectedDate == false ? (
                    <HourCalender
                      updateState={this._updateState}
                      state={this.states}
                    />
                  ) : (
                    <ReservationDetailCard
                      name={
                        this.state.selectedDate.day +
                        this.state.selectedDate.hour
                      }
                    />
                  )}
                </Typography>
              </StepContent>
            </Step>
            <Step key={1} active={this.state.stepThreeActive}>
              <StepLabel>Randevu Al</StepLabel>
              <StepContent>
                <Typography>
                  {isLogin == true ? (
                    <div>Randevu bilgileri</div>
                  ) : this.selectLogin == false ? (
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
                    </div>
                  )}
                </Typography>
              </StepContent>
            </Step>

            {/* {steps.map((label, index) => (
              <Step key={label} onClick={() => {}}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>
                    {this.getStepContent(
                      index,
                      this.state.selectedServices,
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
            ))} */}
          </Stepper>
          {/* {activeStep === steps.length && (
            <Paper square elevation={0}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </Paper>
          )} */}
        </Grid>
      </Grid>
    );
  }
}
export default Reservation;
