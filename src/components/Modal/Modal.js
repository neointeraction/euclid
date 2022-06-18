import React from "react";
import Dialog from "@mui/material/Dialog";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import {
  ModalContainer,
  MOdalContent,
  ModalClose,
  ModalTitle,
} from "./modal-styles";

import Fade from "@mui/material/Fade";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const Modal = ({ title, size, children, open, close }) => {
  return (
    <ModalContainer>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        aria-describedby="close"
        fullWidth
        maxWidth={size}
      >
        <ModalClose>
          <IconButton aria-label="close" onClick={close}>
            <CloseIcon />
          </IconButton>
        </ModalClose>
        <MOdalContent>
          <ModalTitle>{title}</ModalTitle>
          {children}
        </MOdalContent>
      </Dialog>
    </ModalContainer>
  );
};

export default Modal;
