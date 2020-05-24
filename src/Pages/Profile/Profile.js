import React, { useState } from "react";
import styled from "styled-components";
import { Storage } from "../../Utils/importFiles";
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
    maxWidth: 500,
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
const DetailCard = ({}) => {
  const classes = useStyles();

  return (
    <div style={{ width: "100%", margin: "1em 0px" }}>
      <Typography variant="h6" gutterBottom>
        Profil Detay
      </Typography>
      <DetailCardRow title={"Ad soyad"} value="Metin özkan" />
      <DetailCardRow title={"Doğum Tarihi"} value="19/09/1997" bg />
      <DetailCardRow title={"E posta"} value="metin.ozkn@hotmail.com" />
      <DetailCardRow title={"Cep Telefonu"} value="+90 535 053 15 76" bg />

      <Divider variant="middle" style={{ marginTop: "2em" }} />
    </div>
  );
};

const AppointmentsComp = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="complex"
              src="/static/images/grid/complex.jpg"
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">$19.00</Typography>
          </Grid>
        </Grid>
      </Grid>{" "}
    </Paper>
  );
};
const Profile = ({}) => {
  const classes = useStyles();
  const customer = Storage.GetItem("customer");
  const [pageNumber, setPageNumber] = useState(1);
  console.log("paegnjber", pageNumber);

  return customer ? (
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
                <DetailCard />

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
                    value={"Metin Özkan"}
                    onChange={(e) => {
                      //setBarberName(e.target.value);
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
                    label="Doğum Tarihi"
                    value={"19/09/1997"}
                    onChange={(e) => {
                      // setAddress(e.target.value);
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
                    value={"metin.ozkn@hotmail.com"}
                    onChange={(e) => {
                      //    setEmail(e.target.value);
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
                    value={"+90 535 0535 176"}
                    onChange={(e) => {
                      //  setTelephoneNumber(e.target.value);
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
                      // _updateGeneralSettings(barberObject);
                    }}
                  >
                    Kaydet
                  </Button>
                </form>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ) : (
            <AppointmentsComp />
          )}
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Redirect to="/login" />
  );
};

export default Profile;
