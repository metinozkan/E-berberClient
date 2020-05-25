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

import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
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
      isLogin: Storage.GetItem("customer") ? true : false,
      stepperActiveStep: 0,
      stepperLoginOrSignUp: true,
      selectedServices: this.props.match.params.services
        ? this.props.match.params.services
        : Storage.GetItem("services"),

      selectedDate: false,
      reservationObject: { serviceName: "", workerName: "", time: "" },
      stepTwoActive: true,
      stepThreeActive: false,
      showServiceDetailCard: false,
      showDateDetailCard: false,
      personnels: [],
      selectedPersonnel: false,
      openModal: false,
      modalContent: "",
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

  modifyStartDate = (dateDay, dateHour) => {
    const stringdateDay = dateDay.split("/");
    const day = stringdateDay[0];
    const mountWithDay = stringdateDay[1].split(" ");
    const mount = mountWithDay[0];
    const stringDateHour = dateHour.split(".");
    const hour = stringDateHour[0];
    const minute = stringDateHour[1];
    // const stringYear = year.split("-");
    // const stringTimes = time.split(".");
    // const stringTime = stringTimes[0].split(":");

    // const numberYear = Number(stringYear[0]);
    // const numberMonth = Number(stringYear[1] - 1);
    // const numberDay = Number(stringYear[2]);

    // const numberHour = Number(stringTime[0]);
    // const numberMinute = Number(stringTime[1]);
    // const numberSecond = Number(stringTime[2]);
    return new Date(
      Number(2020),
      Number(mount) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    );
  };
  modifyEndDate = (dateDay, dateHour, serviceDuration) => {
    const stringdateDay = dateDay.split("/");
    const day = stringdateDay[0];
    const mountWithDay = stringdateDay[1].split(" ");
    const mount = mountWithDay[0];
    const stringDateHour = dateHour.split(".");
    let hour = stringDateHour[0];
    let minute = stringDateHour[1];
    console.log("serviceDuratin,", Number(minute), serviceDuration);
    let newMinute = Number(minute) + serviceDuration;
    console.log("newMinute", newMinute);
    if (newMinute > 60) {
      const newHour = parseInt(newMinute / 60);
      newMinute = newMinute % 60;
      hour = Number(hour) + Number(newHour);
      minute = Number(newMinute);
      console.log("bitsi saat ve dakikası", hour, minute);
    } else {
      minute = newMinute;
    }
    // if (true) {
    //   const newHour = newMinute % 60;
    //   console.log("dakika saat", 50 % 60);
    // }
    // console.log("asd", day, mount);
    return new Date(
      2020,
      Number(mount) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    );
  };
  render() {
    const barberId = this.props.match.params.barberId;
    const customerId = Storage.GetItem("customer").id;
    console.log("ne imis", this.state.openModal);
    //const steps = this.getSteps();
    const activeStep = this.state.stepperActiveStep;
    return (
      <div>
        <ConfirmModal
          openModal={this.state.openModal}
          setOpenConfirm={(value) => {
            this.setState({ openModal: value });
          }}
          confirmMesage={"Tamam"}
          modalContent={this.state.modalContent}
        />
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
            md={8}
            sm={10}
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
                        index === 0 && this.state.personnels.length > 0 ? (
                          <ServiceSection
                            selectedService={service}
                            updateState={this._updateState}
                            state={this.state}
                            personnels={this.state.personnels}
                          ></ServiceSection>
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
                    {!this.state.isLogin ? (
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "space-between",
                          justifyContent: "center",
                        }}
                      >
                        {this.state.selectedServices.map((service) => {
                          return (
                            <span>
                              {service.name} - {service.time}dk -{" "}
                              {service.price}tl
                            </span>
                          );
                        })}
                        <span>
                          {this.state.selectedDate.day +
                            this.state.selectedDate.hour}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              // this.modifyStartDate(
                              //   this.state.selectedDate.day,
                              //   this.state.selectedDate.hour
                              // );
                              // this.modifyEndDate(
                              //   this.state.selectedDate.day,
                              //   this.state.selectedDate.hour,
                              //   this.state.selectedServices[0].time
                              // );
                              // console.log(
                              //   "elimizde ne var",
                              //   this.state.selectedServices,
                              //   "-------",
                              //   this.state.selectedDate,
                              //   this.state.selectedPersonnel
                              // );
                              const appointmentObject = {
                                barberId: this.props.match.params.barberId,
                                customerId: customerId,
                                appointmentDate: this.modifyStartDate(
                                  this.state.selectedDate.day,
                                  this.state.selectedDate.hour
                                ),
                                appointmentEndDate: this.modifyEndDate(
                                  this.state.selectedDate.day,
                                  this.state.selectedDate.hour,
                                  this.state.selectedServices[0].time
                                ),
                                serviceId: this.state.selectedServices[0].id,
                                staffId: this.state.selectedPersonnel.id,
                              };

                              console.log("giden ınbej", appointmentObject);
                              Agent.Appointments.addAppointments()
                                .send(appointmentObject)
                                .then((res) => {
                                  if (res.ok) {
                                    console.log("randevu basalı", res.body);
                                    this.setState({
                                      openModal: true,
                                      modalContent: (
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          Randevunuz Başarılı bir şekilde
                                          alındı.
                                          <span>
                                            {
                                              res.body.appointmentDate.split(
                                                "T"
                                              )[0]
                                            }
                                          </span>
                                          <span>
                                            {" "}
                                            {
                                              res.body.appointmentDate
                                                .split("T")[1]
                                                .split(".")[0]
                                            }
                                          </span>
                                        </div>
                                      ),
                                    });
                                  }
                                });
                            }}
                          >
                            Randevuyu Al
                          </Button>
                        </span>
                      </div>
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
