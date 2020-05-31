import React, { useEffect, useState } from "react";
import { Agent, Loading } from "../../Utils/importFiles";
import { makeStyles } from "@material-ui/core/styles";
import { SearchInput } from "./components/SearchInput";
import { BarberCard } from "./components/BarberCard";
import MapComp from "./components/MapComp";
import MapBoxComp from "./components/MapBoxComp";
import { Typography, Grid } from "@material-ui/core";

//import imageMahmut from "../../public/mahmut.jpg";

const Barbers = (props) => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const _getBarbers = () => {
    const splitUrl = props.location.search.split("=");
    console.log("split", splitUrl);
    const queryDistrict = splitUrl[1];
    console.log("queryDistrict", queryDistrict);
    if (queryDistrict) {
      Agent.Barbers.getFilterByDistrict()
        .send({ district: queryDistrict })
        .then((res) => {
          if (res.ok) {
            if (!res.body.Error) {
              console.log("geldii", res.body.data);
              setBarbers(res.body.data);
              setLoading(false);
              if (!res.body.data.length == 0) {
                setIsEmpty(true);
              } else {
                console.log("hata", res.body.Message);
              }
            }
          }
        });
    } else {
      Agent.Barbers.getBarbers().then((res) => {
        if (res.ok) {
          console.log("reds", res);
          if (!res.body.Error) {
            setBarbers(res.body.data);
            setLoading(false);
          } else {
            console.log("hata");
          }
        }
      });
    }
  };

  useEffect(() => {
    _getBarbers();
  }, []);
  // console.log("query", props.location.search);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {/* <Grid item xs={12} sm={8} style={{ padding: "1em 0px" }}>
        <SearchInput />
      </Grid> */}
      {!loading ? (
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-star"
        >
          {!isEmpty ? (
            <>
              <Grid item xs={12} sm={8} style={{ marginTop: "2em" }}>
                <Grid container spacing={4}>
                  {barbers.map((barber) => (
                    <Grid item xs={12}>
                      <BarberCard barber={barber}></BarberCard>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                style={{
                  marginTop: "2em",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  aligItems: "center",
                }}
              >
                <MapBoxComp />
              </Grid>
            </>
          ) : (
            <Loading emptyPage></Loading>
          )}
        </Grid>
      ) : (
        <Loading />
      )}
    </Grid>
  );
};
export default Barbers;
