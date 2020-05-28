import React, { useState } from "react";

import undrawLoading from "../../Resources/Images/undraw_loading.svg";
import undraw_empty from "../../Resources/Images/undraw_empty.svg";
import PresentationImage from "../../Resources/Images/undraw_business.svg";
import { motion } from "framer-motion";

export const Loading = ({ type, animateExit, fromSpeaker, emptyPage }) => {
  const image = emptyPage ? undraw_empty : undrawLoading;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          // left: "50%",
          // top: "50%",
          // transform: "translate(-50%, -50%)",
        }}
      >
        <motion.img
          animate={{ scale: 1.3, opacity: 1 }}
          transition={{ duration: 1, yoyo: emptyPage ? "" : Infinity }}
          src={image}
          exit={animateExit && { opacity: 0 }}
          style={{
            width: 300,
            maxWidth: "90%",
            height: "auto",
            opacity: 0.8,
          }}
        />
      </div>
    </div>
  );
};
