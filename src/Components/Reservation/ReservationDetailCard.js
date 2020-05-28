import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    minheight: 150,
  },
}));

const CardItem = ({}) => {
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="subtitle1" color="textSecondary" component="p">
            Hizmet
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="button" display="block" gutterBottom>
            Mehmet Kesici
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
const ReservationDetailCard = ({ service, date, onPress }) => {
  const classes = useStyles();

  return (
    <Card style={{ width: "100%", marginBottom: ".5em" }} elevation={0}>
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{
            background: "white",
            padding: "1em",
            borderRadius: ".2em",
            //   boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
          }}
        >
          <Grid
            item
            xs={10}
            style={{
              background: "white",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {date ? (
              <span style={{ marginRight: ".5em" }}>{date}</span>
            ) : (
              <>
                <span style={{ marginRight: ".5em" }}>{service.name}</span>
                <span style={{ marginRight: ".5em" }}>{service.time} dk</span>
                <span style={{ marginRight: ".5em" }}>{service.price} ₺</span>
              </>
            )}
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => (date ? onPress() : onPress(service.id))}>
              {date ? "Düzenle" : "Kaldır"}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};
export default ReservationDetailCard;
