import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Agent } from "../../Utils/importFiles";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  cardPadding: {
    padding: "8px",
    "&:last-child": {
      paddingBottom: "8px",
    },
  },
}));

const ServiceSection = ({
  selectedService,
  updateState,
  state,
  personnels,
}) => {
  const classes = useStyles();

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
            alignItems: "center",
          }}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <div>
                {selectedService.name} -{selectedService.time}-
                {selectedService.price}
              </div>
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControl
                variant="outlined"
                className={classes.formControl}
                disabled={state.selectedServices.length > 1 ? true : false}
              >
                <InputLabel
                  ref={inputLabel}
                  id="demo-simple-select-outlined-label"
                >
                  Çalışan
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  defaultValue={state.selectedPersonnel.id}
                  onChange={(event) => {
                    updateState({
                      selectedPersonnel: personnels.find(
                        (w) => w.id == event.target.value
                      ),
                    });
                  }}
                  labelWidth={labelWidth}
                >
                  {personnels.map((personnel) => (
                    <MenuItem value={personnel.id}>
                      {personnel.staffName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="outlined" color="primary">
                Kaldır
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
export default ServiceSection;
