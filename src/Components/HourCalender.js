import React, { Component } from "react";

import { Paper, Card, Grid } from "@material-ui/core";

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
class HourCalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countShowDays: 0,
      selectedDate: null,
      staffFreeHoursWeekly: this.props.staffFreeHoursWeekly,
      daysWithFreeHours: [],
      getMonth: "",
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

  EmptyHoursComp = () => {
    return (
      <div style={{ padding: ".5em", cursor: "pointer" }} onClick={() => {}}>
        Randevu yok
      </div>
    );
  };

  componentDidMount = () => {
    // this.createDays();
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
      date.getDate() - date.getDay() + (date.getDay() === 0 ? -2 : 6);
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
    // console.log(
    //   "diff",
    //   date.getDate(),
    //   "-----",
    //   date.getDay(),
    //   "---",
    //   date.getDay(),
    //   "----",
    //   diffMonday,
    //   "---",
    //   diffTuesday,
    //   "----",
    //   date.getMonth()
    // );
    // console.log(new Date(date.setDate(diffTuesday)));
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
            flexDirection: "row",
            justifyContent: "center",
            background: "white",
            // boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
            borderRadius: ".5em",
          }}
        >
          {/* <Grid
            item
            xs={1}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <KeyboardArrowLeft
              onClick={() => {
                this.setState({
                  countShowDays: this.state.countShowDays - 5,
                });
              }}
            />
          </Grid> */}
          {/* {dAys
            // .slice(this.state.countShowDays, this.state.countShowDays + 6)
            .map((x) => (
              <Grid
                item
                xs={2}
                style={{
                  textAlign: "center",
                  margin: ".5em",
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {x.day}
                </div>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {x.emptyHour.map((h) => (
                    <div
                      style={{ padding: ".5em", cursor: "pointer" }}
                      onClick={() => {
                        this.setState({
                          selectedDate: { day: x.day, hour: h },
                        });
                        this.props.updateState({
                          selectedDate: { day: x.day, hour: h },
                          stepThreeActive: true,
                        });
                      }}
                    >
                      {h}
                    </div>
                  ))}
                </Grid>
              </Grid>
            ))} */}

          <Grid
            item
            xs={2}
            style={{
              textAlign: "center",
              margin: ".5em",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>Monday</div>
            <Grid item xs={12} style={this.hoursColumnStyle}>
              {date.getDay() <= 1 && this.state.staffFreeHoursWeekly.Monday ? (
                this.state.staffFreeHoursWeekly.Monday.map((h) => (
                  <div
                    style={{
                      padding: ".5em",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      console.log(
                        "yıl:",
                        2020,
                        "ay:",
                        this.state.getMonth,
                        "gün:",
                        this.state.getDaysArray[0],
                        "saat:",
                        h
                      );
                    }}
                  >
                    {h}
                  </div>
                ))
              ) : (
                <this.EmptyHoursComp />
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              textAlign: "center",
              margin: ".5em",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>Tuesday</div>
            <Grid item xs={12} style={this.hoursColumnStyle}>
              {date.getDay() <= 2 && this.state.staffFreeHoursWeekly.Tuesday ? (
                this.state.staffFreeHoursWeekly.Tuesday.map((h) => (
                  <div
                    style={{ padding: ".5em", cursor: "pointer" }}
                    onClick={() => {
                      console.log(
                        "yıl:",
                        2020,
                        "ay:",
                        this.state.getMonth,
                        "gün:",
                        this.state.getDaysArray[1],
                        "saat:",
                        h
                      );
                    }}
                  >
                    {h}
                  </div>
                ))
              ) : (
                <this.EmptyHoursComp />
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              textAlign: "center",
              margin: ".5em",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              Wednesday
            </div>
            <Grid item xs={12} style={this.hoursColumnStyle}>
              {date.getDay() <= 3 &&
              this.state.staffFreeHoursWeekly.Wednesday ? (
                this.state.staffFreeHoursWeekly.Wednesday.map((h) => (
                  <div
                    style={{ padding: ".5em", cursor: "pointer" }}
                    onClick={() => {
                      console.log(
                        "yıl:",
                        2020,
                        "ay:",
                        this.state.getMonth,
                        "gün:",
                        this.state.getDaysArray[2],
                        "saat:",
                        h
                      );
                    }}
                  >
                    {h}
                  </div>
                ))
              ) : (
                <this.EmptyHoursComp />
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              textAlign: "center",
              margin: ".5em",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>Thursday</div>
            <Grid item xs={12} style={this.hoursColumnStyle}>
              {date.getDay() <= 4 &&
              this.state.staffFreeHoursWeekly.Thursday ? (
                this.state.staffFreeHoursWeekly.Thursday.map((h) => (
                  <div
                    style={{ padding: ".5em", cursor: "pointer" }}
                    onClick={() => {
                      console.log(
                        "yıl:",
                        2020,
                        "ay:",
                        this.state.getMonth,
                        "gün:",
                        this.state.getDaysArray[3],
                        "saat:",
                        h
                      );
                    }}
                  >
                    {h}
                  </div>
                ))
              ) : (
                <this.EmptyHoursComp />
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              textAlign: "center",
              margin: ".5em",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>Friday</div>
            <Grid item xs={12} style={this.hoursColumnStyle}>
              {date.getDay() <= 5 && this.state.staffFreeHoursWeekly.Friday ? (
                this.state.staffFreeHoursWeekly.Friday.map((h) => (
                  <div
                    style={{ padding: ".5em", cursor: "pointer" }}
                    onClick={() => {
                      console.log(
                        "yıl:",
                        2020,
                        "ay:",
                        this.state.getMonth,
                        "gün:",
                        this.state.getDaysArray[4],
                        "saat:",
                        h
                      );
                      console.log(
                        JSON.stringify(
                          new Date(
                            2020,
                            this.state.getMonth,
                            this.state.getDaysArray[4],
                            h.split(":")[0],
                            h.split(":")[1]
                          )
                        )
                      );
                      this.props.updateState({
                        selectedDate: {
                          day:
                            this.state.getDaysArray[4] +
                            "/" +
                            (this.state.getMonth + 1) +
                            "/" +
                            2020,
                          hour: h,
                        },
                        stepThreeActive: true,
                        selectedDateString: JSON.stringify(
                          new Date(
                            2020,
                            this.state.getMonth,
                            this.state.getDaysArray[4],
                            h.split(":")[0],
                            h.split(":")[1]
                          )
                        ),
                      });
                    }}
                  >
                    {h}
                  </div>
                ))
              ) : (
                <this.EmptyHoursComp />
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              textAlign: "center",
              margin: ".5em",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>Saturday</div>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {date.getDay() <= 6 &&
              this.state.staffFreeHoursWeekly.Saturday ? (
                this.state.staffFreeHoursWeekly.Saturday.map((h) => (
                  <div
                    style={{ padding: ".5em", cursor: "pointer" }}
                    onClick={() => {
                      console.log(
                        "yıl:",
                        2020,
                        "ay:",
                        this.state.getMonth,
                        "gün:",
                        this.state.getDaysArray[5],
                        "saat:",
                        h
                      );
                    }}
                  >
                    {h}
                  </div>
                ))
              ) : (
                <this.EmptyHoursComp />
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              textAlign: "center",
              margin: ".5em",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>Sunday</div>
            <Grid item xs={12} style={this.hoursColumnStyle}>
              {date.getDay() <= 7 && this.state.staffFreeHoursWeekly.Sunday ? (
                this.state.staffFreeHoursWeekly.Sunday.map((h) => (
                  <div
                    style={{ padding: ".5em", cursor: "pointer" }}
                    onClick={() => {
                      console.log(
                        "yıl:",
                        2020,
                        "ay:",
                        this.state.getMonth,
                        "gün:",
                        this.state.getDaysArray[6],
                        "saat:",
                        h
                      );
                    }}
                  >
                    {h}
                  </div>
                ))
              ) : (
                <this.EmptyHoursComp />
              )}
            </Grid>
          </Grid>
          {/* <Grid
            item
            xs={2}
            style={{
              textAlign: "center",
              margin: ".5em",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>{x.day}</div>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {x.emptyHour.map((h) => (
                <div
                  style={{ padding: ".5em", cursor: "pointer" }}
                  onClick={() => {
                    this.setState({
                      selectedDate: { day: x.day, hour: h },
                    });
                    this.props.updateState({
                      selectedDate: { day: x.day, hour: h },
                      stepThreeActive: true,
                    });
                  }}
                >
                  {h}
                </div>
              ))}
            </Grid>
          </Grid> */}

          {/* <Grid
            item
            xs={1}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <KeyboardArrowRight
              onClick={() => {
                this.setState({
                  countShowDays: this.state.countShowDays + 5,
                });
              }}
            ></KeyboardArrowRight>
          </Grid> */}
        </div>
      </Grid>
    );
  }
}

export default HourCalender;
