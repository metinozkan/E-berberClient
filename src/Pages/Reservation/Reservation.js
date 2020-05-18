import React, { Component, useState } from "react";
import { Storage, Agent } from "../../Utils/importFiles";

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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const isLogin = false;

const CalenderOrDetail = ({}) => {
  return <HourCalender></HourCalender>;
};
const ServiceSectionOrDetail = ({
  selectedService,
  switchSelect = 1,
  updateState,
  state,
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
      stepperLoginOrSignUp: true,
      selectedServices: Storage.GetItem("services")
        ? Storage.GetItem("services")
        : [],
      selectedDate: false,
      reservationObject: { serviceName: "", workerName: "", time: "" },
      stepTwoActive: true,
      stepThreeActive: false,
      showServiceDetailCard: false,
      showDateDetailCard: false,
      personnels: [],
      selectedPersonnel: false,
    };
  }

  _updateState = (state) => {
    this.setState(state);
  };
  _updateSelectedServices = (service) => {
    let array = this.state.selectedServices;
    array.push(service);
    this.setState({
      selectedServices: array,
    });
  };

  setActiveStep = (step) => {
    this.setState({
      stepperActiveStep: step,
    });
  };
  setStepperLoginOrSignUp = () => {
    this.setState({
      stepperLoginOrSignUp: !this.state.stepperLoginOrSignUp,
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

  deleteSelectedService = (id) => {
    let tempSelectedServices = this.state.selectedServices.filter(
      (service) => service.id != id && service
    );
    this.setState({
      selectedServices: tempSelectedServices,
    });
  };

  deleteDate = () => {
    console.log(this.state.selectedDate);
    this.setState({
      selectedDate: false,
      stepTwoActive: true,
    });
  };
  _getPersonnel = () => {
    Agent.Staffs.getStaffBarber(this.props.match.params.barberId).then(
      (res) => {
        if (res.ok) {
          this.setState({
            personnels: res.body,
            selectedPersonnel: res.body[0],
          });
        }
      }
    );
  };

  componentDidMount() {
    this._getPersonnel();
  }
  render() {
    const barberId = this.props.match.params.barberId;

    //const steps = this.getSteps();
    const activeStep = this.state.stepperActiveStep;
    return (
      <div>
        <Grid
          container
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
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
              alignItems: "flex-start",
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
                    {this.state.selectedServices &&
                      this.state.selectedServices.map((service, index) =>
                        index === 0 ? (
                          this.state.personnels.length > 0 && (
                            <ServiceSection
                              selectedService={service}
                              updateState={this._updateState}
                              state={this.state}
                              personnels={this.state.personnels}
                            ></ServiceSection>
                          )
                        ) : (
                          <ReservationDetailCard
                            onPress={this.deleteSelectedService}
                            key={index}
                            service={service}
                          ></ReservationDetailCard>
                        )
                      )}

                    {!this.state.selectedDate && (
                      <ServicesListModal
                        openModal={this.state.selectedServices.length == 0}
                        updateState={this._updateState}
                        updateSelectedServices={this._updateSelectedServices}
                        state={this.state}
                        handleNextStepper={this.handleNext}
                        barberId={barberId}
                      ></ServicesListModal>
                    )}
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
                        onPress={this.deleteDate}
                        date={
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
                    {isLogin == false ? (
                      this.state.stepperLoginOrSignUp == false ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <StepperEndSign
                            setStepperLoginOrSignUp={
                              this.setStepperLoginOrSignUp
                            }
                          ></StepperEndSign>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <StepperEndLogin
                            setStepperLoginOrSignUp={
                              this.setStepperLoginOrSignUp
                            }
                          ></StepperEndLogin>
                        </div>
                      )
                    ) : (
                      <div>Randevunuz</div>
                    )}
                  </Typography>
                </StepContent>
              </Step>
            </Stepper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Reservation;
