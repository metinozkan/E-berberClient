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
} from "@material-ui/core";

const TopNavBar = styled.div`
  width: 100%;
  height: 35px;
  padding: 0.5em;
  margin-top: 1em;
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
}));

const DetailCardRow = ({ title, value }) => {
  return (
    <div style={{ position: "relative", width: "100%", padding: ".5em" }}>
      <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>
        {title}
      </span>
      <span style={{ position: "absolute", left: "200px" }}>{value}</span>
    </div>
  );
};
const DetailCard = ({}) => {
  return (
    <div style={{ width: "60%" }}>
      <DetailCardRow title={"Ad soyad"} value="Metin özkan" />
    </div>
  );
};
const Profile = ({}) => {
  const classes = useStyles();
  const customer = Storage.GetItem("customer");
  const [pageNumber, setPageNumber] = useState(1);
  console.log("paegnjber", pageNumber);

  return customer ? (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      style={{}}
    >
      <Grid item xs={12} style={{ width: "100%" }}>
        <TopNavBar>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: ".5em" }}
            onClick={() => {
              setPageNumber(1);
            }}
          >
            Kişisel Bilgiler
          </Button>
          <Button
            variant="outlined"
            color="primary"
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
        xs={8}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
            <ExpansionPanelSummary
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                Profili Düzenle
              </Typography>
              <Typography className={classes.secondaryHeading}></Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                style={{}}
              >
                <TextField
                  id="outlined-full-width"
                  label="İşletme adı"
                  value={"barberName"}
                  onChange={(e) => {
                    //setBarberName(e.target.value);
                  }}
                  style={{}}
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
                  label="Adres"
                  value={"address"}
                  onChange={(e) => {
                    // setAddress(e.target.value);
                  }}
                  style={{}}
                  placeholder="Placeholder"
                  // helperText="Full width!"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                />
                <TextField
                  id="outlined-full-width"
                  label="E posta adresi"
                  value={"email"}
                  onChange={(e) => {
                    //    setEmail(e.target.value);
                  }}
                  style={{}}
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
                  value={"telephoneNumber"}
                  onChange={(e) => {
                    //  setTelephoneNumber(e.target.value);
                  }}
                  style={{}}
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
          <div>randevuler</div>
        )}
      </Grid>
    </Grid>
  ) : (
    <Redirect to="/login" />
  );
};

export default Profile;
