import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Storage, Agent, Loading } from "../../Utils/importFiles";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Container,
  Divider,
  Paper,
  ButtonBase,
} from "@material-ui/core";

const TopNavBar = styled.div`
  width: 100%;
  height: 35px;
  padding: 0.5em;
  margin: 1em 0px;
  border-bottom: 1px solid darkGray;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    padding: ".5em",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: "100%",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const DetailCardRow = ({ title, value, bg }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: ".5em",
        background: bg && "#f8f8f8",
        padding: ".5em 0px",
      }}
    >
      <span style={{ textTransform: "uppercase", fontWeight: 450 }}>
        {title}
      </span>
      <span style={{ position: "absolute", left: "200px" }}>{value}</span>
    </div>
  );
};
const DetailCard = ({ customer }) => {
  const classes = useStyles();

  return (
    <div style={{ width: "100%", margin: "1em 0px" }}>
      <Typography variant="h6" gutterBottom>
        Profil Detay
      </Typography>
      <DetailCardRow
        title={"Ad soyad"}
        value={customer.name + " " + customer.lastName}
      />
      <DetailCardRow title={"Doğum Tarihi"} value="19/09/1997" bg />
      <DetailCardRow title={"E posta"} value={customer.eMail} />
      <DetailCardRow
        title={"Cep Telefonu"}
        value={customer.phoneNo ? customer.phoneNo : "-"}
        bg
      />

      <Divider variant="middle" style={{ marginTop: "2em" }} />
    </div>
  );
};

const AppointmentsComp = ({ appointment }) => {
  const classes = useStyles();
  const date = appointment.appointmentDate.split("T");
  const day = date[0];
  const dateHour = date[1];
  const hour = dateHour.split(".")[0];

  const [barberAddress, setBarberAddress] = useState();
  const [staffName, setStaffName] = useState();
  const [services, setServices] = useState();

  const _getServicesBarber = () => {
    Agent.ServiceBarber.getServices(appointment.barberId).then((res) => {
      if (res.ok) {
        console.log("gelen service", res.body);
        const appointmentServices = res.body.filter(
          (service) => appointment.serviceId.indexOf(service.id) > -1 && service
        );
        console.log("harbiden buldu", appointmentServices);
        setServices(appointmentServices);
      }
    });
  };

  const _getStaffsBarber = () => {
    Agent.Staffs.getStaffBarber(appointment.barberId).then((res) => {
      if (res.ok) {
        console.log("gelen staff", res.body);
        const appointmentStaff = res.body.find(
          (staff) => staff.id == appointment.staffId
        );
        setStaffName(appointmentStaff.staffName);
      }
    });
  };

  const _getBarber = () => {
    Agent.Barbers.getBarber(appointment.barberId).then((res) => {
      if (res.ok) {
        console.log("barber,", res.body);
        setBarberAddress(res.body.adress);
      }
    });
  };

  useEffect(() => {
    _getServicesBarber();
    _getStaffsBarber();
    _getBarber();
  }, []);
  return (
    <Paper
      className={classes.paper}
      style={{ width: "100%", margin: "1em 0px" }}
    >
      <Grid container spacing={2}>
        <Grid item>
          {/* <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="complex"
              src="/static/images/grid/complex.jpg"
            />
          </ButtonBase> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              borderRight: "1px solid darkGray",
              padding: ".5em",
              paddingRight: "1em",
            }}
          >
            {/* <span> 2 Haziran 2020</span> */}
            <span> {day}</span>

            <span>{hour}</span>
            {/* <span>Cuma</span> */}
          </div>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              {services &&
                services.map((service) => (
                  <Typography variant="subtitle1">{service.name}</Typography>
                ))}

              <Typography variant="body2" gutterBottom>
                {/* Serdivan Berber(bilmem ne caddesi no:35) */}
                {barberAddress}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {/* Ahmet usta */}
                {staffName}
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                İptal Et
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {services &&
              services.map((service) => (
                <Typography variant="subtitle1">{service.price}</Typography>
              ))}
            {/* <Typography variant="subtitle1">35₺</Typography> */}
          </Grid>
        </Grid>
      </Grid>{" "}
    </Paper>
  );
};
const Profile = ({}) => {
  const classes = useStyles();
  const customerStorage = Storage.GetItem("customer");
  const [pageNumber, setPageNumber] = useState(1);
  const [customer, setCustomer] = useState();
  const [customerAppointments, setCustomerAppointments] = useState();
  const [customerName, setCustomerName] = useState(" ");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerBirthDate, setCustomerBirthDate] = useState("");
  const [customereMail, setCustomereMail] = useState("");
  const [customerPhoneNo, setCustomerPhoneNo] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const _getCustomer = (customerStorageId) => {
    Agent.Customers.getCustomer(customerStorageId).then((res) => {
      if (res.ok) {
        console.log("get customer", res.body);
        setCustomer(res.body);
        setCustomerName(res.body.name);
        setCustomerLastName(res.body.lastName);
        setCustomerBirthDate(res.body.saveDate);
        setCustomereMail(res.body.eMail);
        setCustomerPhoneNo(res.body.phoneNo);
      }
    });
  };

  const _getCustomerAppointments = (customerStorageId) => {
    Agent.Appointments.getCustomerAppointments(customerStorageId).then(
      (res) => {
        if (res.ok) {
          console.log("randevular", res.body[0]);
          setCustomerAppointments(res.body[0]);
          setIsLoading(false);
        }
      }
    );
  };

  const _updateCustomer = (customerObject) => {
    Agent.Customers.updateCustomer(customerStorage.id)
      .send(customerObject)
      .then((res) => {
        if (res.ok) {
          console.log("update", res.body);
          setCustomer(res.body);
        }
      });
  };
  useEffect(() => {
    if (customerStorage) {
      _getCustomer(customerStorage.id);
      _getCustomerAppointments(customerStorage.id);
    }
  }, []);

  const CustomerObject = {
    name: customerName,
    lastName: customerLastName,
    // saveDate: "20.05.2020",
    eMail: customereMail,
    phoneNo: customerPhoneNo,
  };
  return customerStorage ? (
    <Container
      fixed
      maxWidth="md"
      style={{ background: "white", height: "100vh" }}
    >
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} style={{ width: "100%" }}>
          <TopNavBar>
            <Button
              variant="outlined"
              color="primary"
              style={{
                marginRight: ".5em",
                background: pageNumber == 1 && "#3f51b5",
                color: pageNumber == 1 && "white",
              }}
              onClick={() => {
                setPageNumber(1);
              }}
            >
              Kişisel Bilgiler
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{
                marginRight: ".5em",
                background: pageNumber == 2 && "#3f51b5",
                color: pageNumber == 2 && "white",
              }}
              onClick={() => {
                setPageNumber(2);
              }}
            >
              Randevularım
            </Button>
          </TopNavBar>
        </Grid>

        {!isLoading ? (
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
              height: "100%",
              width: "100%",
            }}
          >
            {pageNumber == 1 ? (
              <ExpansionPanel
                expanded={true}
                // onChange={"handleChange("panel1")"}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <ExpansionPanelDetails
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  {customer && <DetailCard customer={customer} />}

                  <Typography variant="h6" gutterBottom>
                    Profili Düzenle
                  </Typography>
                  <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    style={{}}
                  >
                    <TextField
                      id="outlined-full-width"
                      label="Kullanıcı adı"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                      }}
                      style={{
                        paddingBottom: ".5em",
                      }}
                      //  placeholder="Placeholder"
                      // helperText="Full width!"
                      fullWidth
                      margin="dense"
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-full-width"
                      label="Kullanıcı Soyadı"
                      value={customerLastName}
                      onChange={(e) => {
                        setCustomerLastName(e.target.value);
                      }}
                      style={{
                        paddingBottom: ".5em",
                      }}
                      //  placeholder="Placeholder"
                      // helperText="Full width!"
                      fullWidth
                      margin="dense"
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      variant="outlined"
                    />
                    <TextField
                      id="date"
                      type="date"
                      defaultValue="2020-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Doğum Tarihi"
                      value={customerBirthDate}
                      onChange={(e) => {
                        setCustomerBirthDate(e.target.value);
                      }}
                      style={{
                        paddingBottom: ".5em",
                      }}
                      placeholder="Placeholder"
                      // helperText="Full width!"
                      fullWidth
                      margin="dense"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-full-width"
                      label="E posta adresi"
                      value={customereMail}
                      onChange={(e) => {
                        setCustomereMail(e.target.value);
                      }}
                      style={{
                        paddingBottom: ".5em",
                      }}
                      placeholder="Placeholder"
                      // helperText="Full width!"
                      fullWidth
                      margin="dense"
                      InputLabelProps={
                        {
                          // shrink: true,
                        }
                      }
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-full-width"
                      label="Telefon Numarası"
                      value={customerPhoneNo}
                      onChange={(e) => {
                        setCustomerPhoneNo(e.target.value);
                      }}
                      style={{
                        paddingBottom: "1em",
                      }}
                      placeholder="Placeholder"
                      // helperText="Full width!"
                      fullWidth
                      margin="dense"
                      InputLabelProps={
                        {
                          // shrink: true,
                        }
                      }
                      variant="outlined"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      fullWidth
                      onClick={() => {
                        console.log("object", CustomerObject);
                        _updateCustomer(CustomerObject);
                      }}
                    >
                      Kaydet
                    </Button>
                  </form>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ) : (
              <>
                {/* {customerAppointments &&
                  customerAppointments.map((appointment) => ( */}
                <AppointmentsComp appointment={customerAppointments} />
                {/* ))} */}
              </>
            )}
          </Grid>
        ) : (
          <Loading></Loading>
        )}
      </Grid>
    </Container>
  ) : (
    <Redirect to="/login" />
  );
};

export default Profile;
