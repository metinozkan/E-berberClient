import React, { Component, useState } from "react";
import { Storage, Agent, Loading } from "../../Utils/importFiles";

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
import FreeHoursComp from "../../Components/Reservation/FreeHoursComp";
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
      selectedDateString: false,
      reservationObject: { serviceName: "", workerName: "", time: "" },
      stepTwoActive: true,
      stepThreeActive: false,
      showServiceDetailCard: false,
      showDateDetailCard: false,
      personnels: [],
      selectedPersonnel: false,
      openConfirmModal: false,
      modalContent: "",
      staffFreeHoursWeekly: false,
      isLoading: true,
      isLoadingForAddAppointment: false,
    };
  }
  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  setCustomerIsLogin = (customer) => {
    this.props.setCustomer(customer);
    this.setState({
      isLogin: customer && true,
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
          //simdiki id 4
          //  this._getStaffFreeHours(res.body[0].id);
        }
      }
    );
  };

  _getStaffFreeHours = (personnelId) => {
    Agent.Staffs.getFreeHoursWeekly(personnelId).then((res) => {
      if (res.ok) {
        if (!res.body.Error) {
          this.setState({
            staffFreeHoursWeekly: res.body.data,
            isLoading: false,
          });
        } else {
          console.log("hata", res.body.Message);
        }
      }
    });
  };

  componentDidMount() {
    //    this._getPersonnel();
    const personnels = [
      { id: 1, staffName: "Ahmet" },
      { id: 2, staffName: "Mehmet" },
    ];
    const staffFree = {
      Monday: ["20.00", "22:00"],
      Tuesday: ["20.00", "22:00"],
      Wednesday: ["20.00", "22:00"],
      Thursday: ["20.00", "22:00"],
      Friday: ["20.00", "22:00"],
      Saturday: ["20.00", "22:00"],
      Sunday: ["20.00", "22:00"],
    };
    this.setState({
      personnels: personnels,
      selectedPersonnel: personnels[0],
      staffFreeHoursWeekly: staffFree,
      isLoading: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedPersonnel !== this.state.selectedPersonnel) {
      // this._getStaffFreeHours(this.state.selectedPersonnel.id);
    }
  }

  modifyStartDate = (dateDay, dateHour) => {
    const stringdateDay = dateDay.split("/");
    const day = stringdateDay[0];

    const mount = stringdateDay[1];

    const stringDateHour = dateHour.split(":");
    const hour = stringDateHour[0];
    const minute = stringDateHour[1];

    const dayName = this.dayNames[
      new Date(Number(2020), Number(mount) - 1, Number(day)).getDay()
    ];

    const monthName = this.monthNames[Number(mount) - 1];

    return new Date(
      `${dayName} ${monthName} ${Number(day)} 2020 ${Number(hour)}:${Number(
        minute
      )}:00 GMT-0000`
    ).toUTCString();
    //return new Date("Sunday May 31 2020 18:00:00 GMT-0000").toUTCString();
  };
  modifyEndDate = (dateDay, dateHour, serviceTotalDuration) => {
    const stringdateDay = dateDay.split("/");
    const day = stringdateDay[0];
    // const mountWithDay = stringdateDay[1].split(" ");
    // const mount = mountWithDay[0];
    const mount = stringdateDay[1];
    const stringDateHour = dateHour.split(":");
    let hour = stringDateHour[0];
    let minute = stringDateHour[1];
    let newMinute = Number(minute) + serviceTotalDuration;
    if (newMinute > 60) {
      const newHour = parseInt(newMinute / 60);
      newMinute = newMinute % 60;
      hour = Number(hour) + Number(newHour);
      minute = Number(newMinute);
    } else {
      minute = newMinute;
    }
    // if (true) {
    //   const newHour = newMinute % 60;
    //   console.log("dakika saat", 50 % 60);
    // }
    // console.log("asd", day, mount);

    // return new Date(
    //   2020,
    //   Number(mount) - 1,
    //   Number(day),
    //   Number(hour),
    //   Number(minute)
    // );
    const dayName = this.dayNames[
      new Date(Number(2020), Number(mount) - 1, Number(day)).getDay()
    ];

    const monthName = this.monthNames[Number(mount) - 1];
    return new Date(
      `${dayName} ${monthName} ${Number(day)} 2020 ${Number(hour)}:${Number(
        minute
      )}:00  GMT-0000`
    ).toUTCString();
    //return new Date("Sun May 31 2020 18:10:00  GMT-0000").toUTCString();
  };

  serviceTimesTotal = (serviceTimes) => {
    var result = serviceTimes.reduce(function (tot, arr) {
      // return the sum with previous value
      return tot + arr;

      // set initial value as 0
    }, 0);
    return result;
  };
  render() {
    const barberId = this.props.match.params.barberId;
    const customerId = Storage.GetItem("customer")
      ? Storage.GetItem("customer").id
      : false;
    //const steps = this.getSteps();
    const activeStep = this.state.stepperActiveStep;
    const { history } = this.props;
    return (
      <div>
        <ConfirmModal
          openConfirmModal={this.state.openConfirmModal}
          setOpenConfirmModal={(value) => {
            this.setState({ openConfirmModal: value });
            if (this.state.goProfile) history.push("/profile");
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
            marginTop: "1em",
          }}
        >
          {!this.state.isLoading ? (
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
                style={{
                  width: "100%",

                  background: "#f5f5f5",
                }}
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
                        this.state.staffFreeHoursWeekly && (
                          // <HourCalender
                          //   updateState={this._updateState}
                          //   staffFreeHoursWeekly={
                          //     this.state.staffFreeHoursWeekly
                          //   }
                          // />
                          <FreeHoursComp
                            updateState={this._updateState}
                            staffFreeHoursWeekly={
                              this.state.staffFreeHoursWeekly
                            }
                          />
                        )
                      ) : (
                        <ReservationDetailCard
                          onPress={this.deleteDate}
                          date={
                            this.state.selectedDate.day +
                            "    " +
                            "saat:" +
                            this.state.selectedDate.hour
                          }
                        />
                      )}
                    </Typography>
                  </StepContent>
                </Step>
                <Step key={1} active={this.state.stepThreeActive}>
                  {this.state.isLoadingForAddAppointment && <Loading />}
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
                              setCustomerIsLogin={this.setCustomerIsLogin}
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
                              setCustomerIsLogin={this.setCustomerIsLogin}
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
                              "    " +
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
                              // onClick={() => {
                              //   const appointmentObject = {
                              //     barberId: Number(
                              //       this.props.match.params.barberId
                              //     ),
                              //     customerId: customerId,
                              //     appointmentDate: this.modifyStartDate(
                              //       this.state.selectedDate.day,
                              //       this.state.selectedDate.hour
                              //     ),
                              //     appointmentEndDate: this.modifyEndDate(
                              //       this.state.selectedDate.day,
                              //       this.state.selectedDate.hour,
                              //       this.serviceTimesTotal(
                              //         this.state.selectedServices.map(
                              //           (service) => service.time
                              //         )
                              //       )
                              //     ),
                              //     serviceId: this.state.selectedServices.map(
                              //       (service) => service.id
                              //     ),
                              //     // staffId: this.state.selectedPersonnel.id,
                              //     staffId: this.state.selectedPersonnel.id,
                              //   };

                              //   this.setState({
                              //     isLoadingForAddAppointment: true,
                              //   });
                              //   console.log(
                              //     "giden appo objesi",
                              //     appointmentObject
                              //   );
                              //   Agent.Appointments.addAppointments()
                              //     .send(appointmentObject)
                              //     .then((res) => {
                              //       if (res.ok) {
                              //         if (!res.body.Error) {
                              //           this.setState({
                              //             goProfile: true,
                              //             isLoadingForAddAppointment: false,
                              //             openConfirmModal: true,
                              //             modalContent: (
                              //               <div
                              //                 style={{
                              //                   display: "flex",
                              //                   flexDirection: "column",
                              //                   justifyContent: "center",
                              //                   alignItems: "center",
                              //                 }}
                              //               >
                              //                 Randevunuz Başarılı bir şekilde
                              //                 alındı.
                              //                 <span>
                              //                   {
                              //                     res.body.data.appointmentDate.split(
                              //                       "T"
                              //                     )[0]
                              //                   }
                              //                 </span>
                              //                 <span>
                              //                   {
                              //                     res.body.data.appointmentDate
                              //                       .split("T")[1]
                              //                       .split(".")[0]
                              //                   }
                              //                 </span>
                              //               </div>
                              //             ),
                              //           });
                              //         } else {
                              //           this.setState({
                              //             isLoadingForAddAppointment: false,
                              //             openConfirmModal: true,
                              //             modalContent: res.body.Message,
                              //           });
                              //           console.log("hata", res.body.Message);
                              //         }
                              //       } else {
                              //         this.setState({
                              //           isLoadingForAddAppointment: false,
                              //         });
                              //       }
                              //     });
                              // }}
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
          ) : (
            <Loading />
          )}
        </Grid>
      </div>
    );
  }
}
export default Reservation;
