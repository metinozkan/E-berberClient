import React, { useState, useEffect } from "react";
import { districts } from "../../Utils/data";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Background from "../../Resources/Images/bgberber.jpg";
import Typography from "@material-ui/core/Typography";
import { StoreMallDirectory, Navigation, Search } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
const Footer = () => {
  return (
    <Paper
      style={{
        height: "50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        background: " ",
      }}
      color="primary"
    >
      Eberber | tüm hakları saklıdır
    </Paper>
  );
};
const Home = (props) => {
  const classes = useStyles();
  const [district, setDistrict] = useState("Serdivan");

  useEffect(() => {});
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        style={{
          height: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: "1",
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${Background} )`,
            opacity: "0.7",
            zIndex: "-1",
          }}
        ></div>

        <Grid item xs={12} md={6} style={{ zIndex: "1" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                marginBottom: "1em",
                width: "100%",
                marginLeft: "8em",
                padding: ".5em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="h2"
                component="h3"
                style={{ marginBottom: ".3em", color: "white" }}
              >
                Aradığın Hizmet Burada
              </Typography>
              <Typography
                variant="h5"
                component="h3"
                style={{ marginBottom: ".3em", color: "white" }}
              >
                Sade - Kolay -Hızlı randevu
              </Typography>
            </Grid>
          </Grid>
          <Paper
            style={{
              width: "100%",
              marginLeft: "8em",
              padding: ".5em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* <Grid item xs={6}>
                <TextField
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  label="Dükkan ara"
                  style={{ flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StoreMallDirectory />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid> */}

              {/* <TextField
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  label="İlçeye Göre Ara"
                  style={{ flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Navigation />
                      </InputAdornment>
                    ),
                  }}
                /> */}
              <Autocomplete
                //freeSolo
                fullWidth
                autoSelect={true}
                id="combo-box-demo"
                options={districts}
                getOptionLabel={(option) => option.title}
                style={{ width: "100%" }}
                inputValue={district}
                onInputChange={(event, newInputValue) => {
                  setDistrict(newInputValue);
                }}
                // value={district}
                // onChange={(e, values) => {
                //   console.log(values);
                //   setDistrict(values.title);
                // }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={district}
                    id="outlined-full-width"
                    label="İlçe seçin"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={district}
                  />
                )}
              ></Autocomplete>
              {/* <IconButton
                  // type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                > */}
              <Link
                to={`/barbers?district=${district}`}
                style={{
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Search size={25} />
              </Link>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Home;
