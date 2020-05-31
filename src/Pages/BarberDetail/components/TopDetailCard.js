import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { LocationOnSharp } from "@material-ui/icons";

export const TopDetailCard = ({ barber }) => {
  return (
    <Grid
      item
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        padding: "1em 0px",
      }}
    >
      <Grid item>
        {" "}
        <Typography variant="h4" gutterBottom style={{}}>
          {barber.barberName}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            textDecoration: "underline",
          }}
        >
          {/* <LocationOnSharp color="gray " fontSize="small" /> */}
          {barber.adress}
        </Typography>
      </Grid>
      {/* <Grid item>b</Grid> */}
    </Grid>
  );
};
