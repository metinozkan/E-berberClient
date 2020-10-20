import React, { useState, useEffect } from "react";
import { Agent, Storage, Loading } from "../../Utils/importFiles";
import { Grid, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Card } from "@material-ui/core";
import { TopDetailCard } from "./components/TopDetailCard";
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
];
const rows = [];

for (let i = 0; i < sample.length; i += 1) {
  const randomSelection = sample[i];
  rows.push(createData(i, ...randomSelection));
}

function SimpleTable({ services, barberId }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 400 }}
              >
                Hizmetler
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 400 }}
              >
                Süre{" "}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 400 }}
              >
                Ücret{" "}
              </Typography>
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Typography variant="button" display="block" gutterBottom>
                  {row.name}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" color="textSecondary">
                  {row.time}dk
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" gutterBottom>
                  {row.price}₺
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                onClick={() => {
                  //updateState({ selectedService: row.id });
                }}
              >
                <Link
                  to={{
                    pathname: `/barberdetail/${barberId}/reservation`,
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
                  onClick={() => {
                    Storage.SetItem("services", [
                      {
                        id: row.id,
                        name: row.name,
                        time: row.time,
                        price: row.price,
                        workerId: null,
                      },
                    ]);
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
const ClocksTable = ({ workHours }) => {
  const dsays = [
    ["Pazartesi", "08:00-24:00"],
    ["Salı", "08:00-22:00"],
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
          {workHours
            .sort((a, b) => a.id - b.id)
            .map((day) => (
              <TableRow key={day.name}>
                <TableCell component="th" scope="row">
                  {day.day}
                </TableCell>
                <TableCell align="right">
                  {day.startHour}-{day.endHour}
                </TableCell>
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
  const [isLoading, setIsLoading] = useState(false);
  const [workHours, setWorkHours] = useState(false);
  const [barber, setBarber] = useState(false);

  const params = useParams();

  const _getBarberService = () => {
    Agent.ServiceBarber.getServices(params.barberId).then((res) => {
      if (res.ok) {
        if (!res.body.Error) {
          setServices(res.body.data);
        } else {
          console.log("hata", res.body.Message);
        }
      }
    });
  };
  const _getBarberWorkTimes = (barberId) => {
    Agent.Barbers.getBarberWorkTimes(barberId).then((res) => {
      if (res.ok) {
        if (!res.body.Error) {
          setWorkHours(res.body.data);
          setIsLoading(false);
        } else {
          console.log("hata", res.body.Error);
        }
      }
    });
  };

  const _getBarber = () => {
    Agent.Barbers.getBarber(params.barberId).then((res) => {
      if (res.ok) {
        if (!res.body.Error) {
          setBarber(res.body.data);
          _getBarberWorkTimes(res.body.data.id);
        } else {
          console.log("hata", res.body.Message);
        }
      }
    });
  };

  useEffect(() => {
    // _getBarberService();
    // _getBarber();

    const barbers = {
      id: 1,
      barberName: "Serdivan Kuaför",
      district: "Serdivan",
      adress: "İstiklal mahallesi",
    };

    const services = [
      {
        id: 1,
        name: "Saç",
        price: "35",
        time: "30",
      },
      {
        id: 2,
        name: "Sakal",
        price: "15",
        time: "15",
      },
    ];
    const days = [
      { id: 1, day: "Pazartesi", startHour: "08:00", endHour: "24:00" },
      { id: 2, day: "Salı", startHour: "08:00", endHour: "24:00" },
      { id: 3, day: "Çarşamba", startHour: "08:00", endHour: "24:00" },
      { id: 4, day: "Perşembe", startHour: "08:00", endHour: "24:00" },
      { id: 5, day: "Cuma", startHour: "08:00", endHour: "24:00" },
      { id: 6, day: "Cumartesi", startHour: "08:00", endHour: "24:00" },
      { id: 7, day: "Pazar", startHour: "08:00", endHour: "24:00" },
    ];
    setBarber(barbers);
    setServices(services);
    setWorkHours(days);
  }, []);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={0}
      style={{}}
    >
      {!isLoading ? (
        <>
          <Grid item xs={12} sm={11} md={10} style={{ width: "100%" }}>
            <TopDetailCard barber={barber} />
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={11}
            md={10}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {/* <Grid
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
         </Grid> */}
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
              <SimpleTable
                services={services}
                barberId={params.barberId}
              ></SimpleTable>
            </Grid>
            <Grid
              item
              xs={12}
              sm={11}
              md={5}
              style={{
                height: "auto",
                overflow: "hidden",
              }}
            >
              <Grid item xs={12}>
                <div style={{ padding: "1em" }}>
                  <Card
                    style={{
                      boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.50)",
                      marginBottom: "2em",
                    }}
                  >
                    <CardContent>
                      <Grid container>
                        {/* <Grid
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
                     </Grid> */}

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
                            {workHours && (
                              <ClocksTable workHours={workHours}></ClocksTable>
                            )}
                          </Grid>
                        </Grid>

                        {barber && (
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
                              {barber.adress}
                            </Grid>
                          </Grid>
                        )}
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
        </>
      ) : (
        <Loading />
      )}
    </Grid>
  );
};

export default BarberDetail;
