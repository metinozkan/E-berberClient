import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  cardPadding: {
    padding: "8px",
    "&:last-child": {
      paddingBottom: "8px"
    }
  }
}));

const worker = [
  { id: 1, name: "Ahmet", surname: "Ağa" },
  { id: 2, name: "Mehmet", surname: "Usta" },
  { id: 3, name: "Zeki", surname: "Altınparmak" }
];
const ServiceSection = ({ selectedService }) => {
  const classes = useStyles();
  const [workerId, setWorkerId] = React.useState();
  const handleChange = event => {
    setWorkerId(event.target.value);
  };
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const inputLabel = React.useRef(null);
  return (
    <>
      <Card style={{ marginBottom: "1em" }}>
        <CardContent
          className={classes.cardPadding}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            {selectedService.selectedServiceName} -
            {selectedService.selectedServiceTime}-
            {selectedService.selectedServicePrice}
          </div>

          <div
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={inputLabel}
                id="demo-simple-select-outlined-label"
              >
                Çalışan
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={workerId}
                onChange={handleChange}
                labelWidth={labelWidth}
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                {worker.map(w => (
                  <MenuItem value={w.id}>{w.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="outlined" color="primary">
              Kaldır
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default ServiceSection;
