import React, { Component } from "react";

import { Paper, Card, Grid, Button } from "@material-ui/core";

import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  KeyboardArrowDown,
} from "@material-ui/icons";

const days = ["pzts", "salı", "cars", "pers", "cuma"];
const dAys = [
  { day: "27/05 pzts", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 salı", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 cars", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 pers", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 cuma", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 cmrts", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 pzr", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 pzts 2", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 salı 2", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 cars 2", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 pers 2", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 cuma 2", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 cmrts", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "27/05 pzr", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
];

// this.state.staffFreeHoursWeekly.Monday.map((h) => (
//     <div
//       style={{
//         padding: ".5em",
//         cursor: "pointer",
//       }}
//       onClick={() => {
//         this.props.updateState({
//           selectedDate: {
//             day:
//               this.state.getDaysArray[0] +
//               "/" +
//               (this.state.getMonth + 1) +
//               "/" +
//               2020,
//             hour: h,
//           },
//           stepThreeActive: true,
//           selectedDateString: JSON.stringify(
//             new Date(
//               2020,
//               this.state.getMonth,
//               this.state.getDaysArray[0],
//               h.split(":")[0],
//               h.split(":")[1]
//             )
//           ),
//         });
//       }}
//     >
//       {h}
//     </div>
//   ))
// ) : (
//   <this.EmptyHoursComp />
// )}

class FreeHoursComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countShowDays: 0,
      selectedDate: null,
      staffFreeHoursWeekly: this.props.staffFreeHoursWeekly,
      daysWithFreeHours: [],
      getMonth: "",
      selectedDateButton: 0,
    };
  }
  //state,updateState

  createDays = () => {
    const DaysWithFreeHours = this.state.daysWithFreeHours;

    this.state.staffFreeHoursWeekly.Monday.map((free) =>
      DaysWithFreeHours.push({ day: "Monday", emptyHour: free })
    );
    this.state.staffFreeHoursWeekly.Tuesday.map((free) =>
      DaysWithFreeHours.push({ day: "Tuesday", emptyHour: free })
    );
  };

  hoursColumnStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    overflow: "auto",
  };

  freeHourStyle = {
    cursor: "pointer",
    margin: ".5em",
  };

  EmptyHoursComp = () => {
    return (
      <div style={{ padding: ".5em", cursor: "pointer" }} onClick={() => {}}>
        Randevu yok
      </div>
    );
  };

  componentDidMount = () => {
    var date = new Date();
    var diffMonday =
      date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    var diffTuesday =
      date.getDate() - date.getDay() + (date.getDay() === 0 ? -5 : 2);
    var diffWednesday =
      date.getDate() - date.getDay() + (date.getDay() === 0 ? -4 : 3);
    var diffThursday =
      date.getDate() - date.getDay() + (date.getDay() === 0 ? -3 : 4);

    var diffFriday =
      date.getDate() - date.getDay() + (date.getDay() === 0 ? -2 : 5);
    var diffSaturday =
      date.getDate() - date.getDay() + (date.getDay() === 0 ? -1 : 6);
    var diffSunday =
      date.getDate() - date.getDay() + (date.getDay() === 0 ? 0 : 7);

    this.setState({
      getMonth: date.getMonth(),
      getDaysArray: [
        diffMonday,
        diffTuesday,
        diffWednesday,
        diffThursday,
        diffFriday,
        diffSaturday,
        diffSunday,
      ],
    });
  };
  render() {
    var date = new Date();

    return (
      <Grid
        container
        xs={12}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "white",
            // boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
            borderRadius: ".5em",
          }}
        >
          <Grid item xs={12} style={{ borderBottom: "1px solid gray" }}>
            {this.state.getDaysArray &&
              this.state.getDaysArray.map((day, index) => {
                return (
                  <Button
                    disabled={
                      date.getDay() == 0
                        ? index == 6
                          ? false
                          : true
                        : date.getDay() <= index + 1
                        ? false
                        : true
                    }
                    key={index}
                    color="primary"
                    variant={
                      this.state.selectedDateButton == index
                        ? "contained"
                        : "outlined"
                    }
                    style={{
                      margin: ".5em",
                      color: this.state.selectedDateButton == index && "white",
                    }}
                    onClick={() => {
                      this.setState({
                        selectedDateButton: index,
                      });
                    }}
                  >
                    {day} / {this.state.getMonth + 1}
                  </Button>
                );
              })}
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              borderBottom: "1px solid gray",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {this.state.selectedDateButton == 0
              ? this.state.staffFreeHoursWeekly.Monday.map(
                  (freeHour, index) => {
                    return (
                      <div
                        style={this.freeHourStyle}
                        onClick={() => {
                          this.props.updateState({
                            selectedDate: {
                              day:
                                this.state.getDaysArray[0] +
                                "/" +
                                (this.state.getMonth + 1) +
                                "/" +
                                2020,
                              hour: freeHour,
                            },
                            stepThreeActive: true,
                            selectedDateString: JSON.stringify(
                              new Date(
                                2020,
                                this.state.getMonth,
                                this.state.getDaysArray[0],
                                freeHour.split(":")[0],
                                freeHour.split(":")[1]
                              )
                            ),
                          });
                        }}
                      >
                        {freeHour}
                      </div>
                    );
                  }
                )
              : this.state.selectedDateButton == 1
              ? this.state.staffFreeHoursWeekly.Tuesday.map(
                  (freeHour, index) => {
                    return (
                      <div
                        style={this.freeHourStyle}
                        onClick={() => {
                          this.props.updateState({
                            selectedDate: {
                              day:
                                this.state.getDaysArray[0] +
                                "/" +
                                (this.state.getMonth + 1) +
                                "/" +
                                2020,
                              hour: freeHour,
                            },
                            stepThreeActive: true,
                            selectedDateString: JSON.stringify(
                              new Date(
                                2020,
                                this.state.getMonth,
                                this.state.getDaysArray[0],
                                freeHour.split(":")[0],
                                freeHour.split(":")[1]
                              )
                            ),
                          });
                        }}
                      >
                        {freeHour}
                      </div>
                    );
                  }
                )
              : this.state.selectedDateButton == 2
              ? this.state.staffFreeHoursWeekly.Wednesday.map(
                  (freeHour, index) => {
                    return (
                      <div
                        style={this.freeHourStyle}
                        onClick={() => {
                          this.props.updateState({
                            selectedDate: {
                              day:
                                this.state.getDaysArray[0] +
                                "/" +
                                (this.state.getMonth + 1) +
                                "/" +
                                2020,
                              hour: freeHour,
                            },
                            stepThreeActive: true,
                            selectedDateString: JSON.stringify(
                              new Date(
                                2020,
                                this.state.getMonth,
                                this.state.getDaysArray[0],
                                freeHour.split(":")[0],
                                freeHour.split(":")[1]
                              )
                            ),
                          });
                        }}
                      >
                        {freeHour}
                      </div>
                    );
                  }
                )
              : this.state.selectedDateButton == 3
              ? this.state.staffFreeHoursWeekly.Thursday.map(
                  (freeHour, index) => {
                    return (
                      <div
                        style={this.freeHourStyle}
                        onClick={() => {
                          this.props.updateState({
                            selectedDate: {
                              day:
                                this.state.getDaysArray[0] +
                                "/" +
                                (this.state.getMonth + 1) +
                                "/" +
                                2020,
                              hour: freeHour,
                            },
                            stepThreeActive: true,
                            selectedDateString: JSON.stringify(
                              new Date(
                                2020,
                                this.state.getMonth,
                                this.state.getDaysArray[0],
                                freeHour.split(":")[0],
                                freeHour.split(":")[1]
                              )
                            ),
                          });
                        }}
                      >
                        {freeHour}
                      </div>
                    );
                  }
                )
              : this.state.selectedDateButton == 4
              ? this.state.staffFreeHoursWeekly.Friday.map(
                  (freeHour, index) => {
                    return (
                      <div
                        style={this.freeHourStyle}
                        onClick={() => {
                          this.props.updateState({
                            selectedDate: {
                              day:
                                this.state.getDaysArray[0] +
                                "/" +
                                (this.state.getMonth + 1) +
                                "/" +
                                2020,
                              hour: freeHour,
                            },
                            stepThreeActive: true,
                            selectedDateString: JSON.stringify(
                              new Date(
                                2020,
                                this.state.getMonth,
                                this.state.getDaysArray[0],
                                freeHour.split(":")[0],
                                freeHour.split(":")[1]
                              )
                            ),
                          });
                        }}
                      >
                        {freeHour}
                      </div>
                    );
                  }
                )
              : this.state.selectedDateButton == 5
              ? this.state.staffFreeHoursWeekly.Saturday.map(
                  (freeHour, index) => {
                    return (
                      <div
                        style={this.freeHourStyle}
                        onClick={() => {
                          this.props.updateState({
                            selectedDate: {
                              day:
                                this.state.getDaysArray[0] +
                                "/" +
                                (this.state.getMonth + 1) +
                                "/" +
                                2020,
                              hour: freeHour,
                            },
                            stepThreeActive: true,
                            selectedDateString: JSON.stringify(
                              new Date(
                                2020,
                                this.state.getMonth,
                                this.state.getDaysArray[0],
                                freeHour.split(":")[0],
                                freeHour.split(":")[1]
                              )
                            ),
                          });
                        }}
                      >
                        {freeHour}
                      </div>
                    );
                  }
                )
              : this.state.selectedDateButton == 6
              ? this.state.staffFreeHoursWeekly.Sunday.map(
                  (freeHour, index) => {
                    return (
                      <div
                        style={this.freeHourStyle}
                        onClick={() => {
                          this.props.updateState({
                            selectedDate: {
                              day:
                                this.state.getDaysArray[0] +
                                "/" +
                                (this.state.getMonth + 1) +
                                "/" +
                                2020,
                              hour: freeHour,
                            },
                            stepThreeActive: true,
                            selectedDateString: JSON.stringify(
                              new Date(
                                2020,
                                this.state.getMonth,
                                this.state.getDaysArray[0],
                                freeHour.split(":")[0],
                                freeHour.split(":")[1]
                              )
                            ),
                          });
                        }}
                      >
                        {freeHour}
                      </div>
                    );
                  }
                )
              : null}
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default FreeHoursComp;
