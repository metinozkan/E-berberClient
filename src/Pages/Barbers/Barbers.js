import React, { useEffect, useState } from "react";
import { Agent } from "../../Utils/importFiles";
import { makeStyles } from "@material-ui/core/styles";
import { SearchInput } from "./components/SearchInput";
import { BarberCard } from "./components/BarberCard";
import MapComp from "./components/MapComp";
import { Typography, Grid } from "@material-ui/core";

//import imageMahmut from "../../public/mahmut.jpg";

const Barbers = () => {
  const [barbers, setBarbers] = useState([]);
  const _getBarbers = () => {
    Agent.Barbers.getBarbers().then((res) => {
      if (res.ok) {
        console.log(res.body);
        setBarbers(res.body);
      }
    });
  };

  useEffect(() => {
    _getBarbers();
  }, []);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={8} style={{ padding: "1em 0px" }}>
        <SearchInput />
      </Grid>
      {barbers.length > 0 ? (
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-star"
        >
          <Grid item xs={8} style={{ marginTop: "2em" }}>
            <Grid container spacing={4}>
              {barbers.map((barber) => (
                <Grid item xs={12}>
                  <BarberCard barber={barber}></BarberCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={4} style={{ marginTop: "2em" }}>
            <MapComp />
          </Grid>
        </Grid>
      ) : (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          loading
        </div>
      )}
    </Grid>
  );
};
export default Barbers;
