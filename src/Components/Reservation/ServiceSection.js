import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import ServicesListModal from "./ServicesListModal";

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
export default ServiceSection;
