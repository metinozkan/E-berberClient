import React, { useState, useEffect } from "react";
import { Agent } from "../../Utils/importFiles";
import { Grid, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Card } from "@material-ui/core";

import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  useHistory,
  useRouteMatch,
  useParams,
} from "react-router-dom";

//import Gmap from "../../public/Gmap.png";
//import BerberMahmut from "../../public/berberMahmut.jpg";
const useStyles = makeStyles({
  root: {
    width: "100%",
    overflow: "auto",
    marginBottom: "5em",
  },
  table: {
    // minWidth: 650
  },
});

function createData(id, name, time, price, button) {
  return { id, name, time, price, button };
}
const sample = [
  [
    "Saç",
    "30min",
    "15tl",
    <Button
      variant="outlined"
      color="secondary"
      size="small"
      onClick={() => {}}
    >
      Seç
    </Button>,
  ],
  [
    "Sakal",
    "15min",
    "10tl",
    <Button variant="outlined" color="secondary" size="small">
      Seç
    </Button>,
  ],
  [
    "Yıkama",
    "20min",
    "115tl",
    <Button variant="outlined" color="secondary" size="small">
      Seç
    </Button>,
  ],
  // ["Cupcake", 305, 3.7, 67, 4.3],
  // ["Gingerbread", 356, 16.0, 49, 3.9]
]; // const rows = [];
const rows = [];

for (let i = 0; i < sample.length; i += 1) {
  const randomSelection = sample[i];
  rows.push(createData(i, ...randomSelection));
}
// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, <button>slm</button>),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9)
// ];

function SimpleTable({ services }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hizmetler</TableCell>
            <TableCell align="right">Süre</TableCell>
            <TableCell align="right">Ücret</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell
                align="right"
                onClick={() => {
                  console.log(row.name, row.id);
                  //updateState({ selectedService: row.id });
                }}
              >
                <Link
                  to={{
                    pathname: "/reservation",
                    state: {
                      services: [
                        {
                          id: row.id,
                          name: row.name,
                          time: row.time,
                          price: row.price,
                          workerId: null,
                        },
                      ],
                    },
                  }}
                >
                  <Button variant="outlined" color="secondary" size="small">
                    Seç
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
const ClocksTable = () => {
  const dsays = [
    ["Pazartesi", "08:00-24:00"],
    ["Salı", "08:00-22:00"],
  ];
  const days = [
    { name: "Pazartesi", time: "08:00-24:00" },
    { name: "Salı", time: "08:50-21:00" },
    { name: "Çarşamba", time: "08:00-24:00" },
    { name: "Perşembe", time: "08:50-21:00" },
    { name: "Cuma", time: "08:00-24:00" },
    { name: "Cumartesi", time: "08:50-21:00" },
    { name: "Pazar", time: "08:50-21:00" },
  ];
  return (
    <div style={{ width: "100%", overflow: "auto" }}>
      <Table aria-label="simple table">
        {/* <TableHead>
          <TableRow>
            <TableCell>Gün</TableCell>
            <TableCell align="right">Saat</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {days.map((day) => (
            <TableRow key={day.name}>
              <TableCell component="th" scope="row">
                {day.name}
              </TableCell>
              <TableCell align="right">{day.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const BerberMahmut = "";
const Gmap = "";
const BarberDetail = () => {
  const [services, setServices] = useState([]);
  const params = useParams();
  console.log(params);

  const _getBarberService = () => {
    Agent.ServiceBarber.getServices(params.barberId).then((res) => {
      if (res.ok) {
        console.log(res.body);
        setServices(res.body);
      }
    });
  };

  useEffect(() => {
    _getBarberService();
  });
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={0}
      style={{}}
    >
      {services.length > 0 ? (
        <Grid item container xs={12} sm={10} md={9}>
          <Grid
            item
            xs={12}
            style={{
              backgroundColor: "aqua",
              height: "350px",
              marginBottom: "5em",
            }}
          >
            <img
              style={{ height: "100%", width: "100%" }}
              src={BerberMahmut}
            ></img>
          </Grid>
          <Grid
            item
            xs={12}
            sm={11}
            md={7}
            style={{
              height: "auto",
              paddingRight: "1em",
              paddingTop: "1em",
            }}
          >
            <SimpleTable services={services}></SimpleTable>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            style={{
              height: "auto",
              overflow: "hidden",
            }}
          >
            <Grid item x={12}>
              <div style={{ padding: "1em" }}>
                <Card
                  style={{
                    boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.50)",
                    marginBottom: "2em",
                  }}
                >
                  <CardContent>
                    <Grid container>
                      <Grid
                        item
                        container
                        xs={12}
                        style={{
                          marginBottom: "1em",
                          paddingBottom: "1em",
                          borderBottom: "1px solid #e2e2e2",
                        }}
                      >
                        <Grid item xs={4} style={{}}>
                          <span>Hakkında:</span>
                        </Grid>
                        <Grid item xs={8} style={{}}>
                          acıklamaasd asd asşldk asd as ubrap rakip olarak bul
                          sdfas
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        container
                        xs={12}
                        style={{
                          marginBottom: "1em",
                          paddingBottom: "1em",
                          borderBottom: "1px solid #e2e2e2",
                        }}
                      >
                        <Grid item xs={4} style={{ marginTop: "1em" }}>
                          Çalışma Saatleri:
                        </Grid>
                        <Grid item xs={8} style={{}}>
                          <ClocksTable></ClocksTable>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        container
                        xs={12}
                        style={{ marginBottom: "1em" }}
                      >
                        <Grid item xs={4} style={{}}>
                          Adres Tarifi:
                        </Grid>
                        <Grid item xs={8} style={{}}>
                          Serdivan Vatan Bilgisayar yanı
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <img
              style={{ overflow: "hidden", height: "450px" }}
              src={Gmap}
            ></img>
          </Grid>
        </Grid>
      ) : (
        <div>Loading</div>
      )}
    </Grid>
  );
};

export default BarberDetail;
