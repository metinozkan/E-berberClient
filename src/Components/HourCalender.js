import React, { Component } from "react";

import { Paper, Card, Grid } from "@material-ui/core";

import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  KeyboardArrowDown
} from "@material-ui/icons";

const days = ["pzts", "salı", "cars", "pers", "cuma"];
const dAys = [
  { day: "18/02 pzts", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 salı", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 cars", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 pers", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 cuma", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 cumrts", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 pzr", emptyHour: ["10.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 pzts 2", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 salı 2", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 cars 2", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 pers 2", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 cuma 2", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 cumrts", emptyHour: ["9.00", "10.30", "11.30", "13.00"] },
  { day: "18/02 pzr", emptyHour: ["10.00", "10.30", "11.30", "13.00"] }
];
class HourCalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countShowDays: 0
    };
  }
  render() {
    return (
      <Grid
        container
        xs={10}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            height: "580px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            background: "white",
            boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
            borderRadius: ".5em"
          }}
        >
          <Grid
            item
            xs={1}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <KeyboardArrowLeft
              onClick={() => {
                this.setState({
                  countShowDays: this.state.countShowDays - 5
                });
              }}
            />
          </Grid>
          {dAys
            .slice(this.state.countShowDays, this.state.countShowDays + 6)
            .map(x => (
              <Grid
                item
                xs={2}
                style={{
                  textAlign: "center",
                  margin: ".5em"
                }}
              >
                {x.day}
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {x.emptyHour.map(h => (
                    <div style={{ padding: ".5em" }}>{h}</div>
                  ))}
                </Grid>
              </Grid>
            ))}
          <Grid
            item
            xs={1}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <KeyboardArrowRight
              onClick={() => {
                this.setState({
                  countShowDays: this.state.countShowDays + 5
                });
              }}
            ></KeyboardArrowRight>
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default HourCalender;
