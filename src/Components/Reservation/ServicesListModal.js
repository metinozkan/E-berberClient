import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import HourCalender from "../../Components/HourCalender";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { ServicesList } from "../../Components/ServicesList";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ServicesListModal = ({
  updateState,
  state,
  updateSelectedServices,
  handleNextStepper
}) => {
  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {openConfirm && (
        <ConfirmModal
          title={"Çalışan seçmelisiniz"}
          confirmMesage={"Tamam"}
          openModal={true}
          setOpenConfirm={setOpenConfirm}
        ></ConfirmModal>
      )}
      <Button
        variant="outlined"
        color="primary"
        style={{
          marginTop: "2em",
          marginBottom: "2em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onClick={() => {
          // state.selectedWorker ? handleClickOpen() : setOpenConfirm(true);
          handleClickOpen();
        }}
      >
        <Icon fontSize="small" style={{ marginRight: ".5em" }}>
          add_circle
        </Icon>
        Babacıımmmmmmmm hizmet eklee
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Hizmet ekle</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Eklemek istediğiniz hizmeti seçin
          </DialogContentText>
          <ServicesList
            updateSelectedServices={updateSelectedServices}
            handleCloseModal={handleClose}
            handleNextStepper={handleNextStepper}
          ></ServicesList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ServicesListModal;
