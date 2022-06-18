import React from "react";
import Fade from "@mui/material/Fade";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { AlertContainer, AletBox } from "./alert.styles";

import AlertErrorIcon from "assets/images/icons/alert-error.svg";
import AlertWarningIcon from "assets/images/icons/alert-warning.svg";
import AlertSuccessIcon from "assets/images/icons/alert-success.svg";

const CusAlert = ({ type, onClose, message }) => {
  return (
    <Fade in>
      <AlertContainer type={type}>
        <AletBox>
          <img
            src={
              type === "success"
                ? AlertSuccessIcon
                : type === "warning"
                ? AlertWarningIcon
                : AlertErrorIcon
            }
            alt=""
          />
          <p>{message}</p>
        </AletBox>
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </AlertContainer>
    </Fade>
  );
};

export default CusAlert;
