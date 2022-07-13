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

const Modal = ({ title, size, children, open, close, hideClose }) => {
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
        {hideClose ? null : (
          <ModalClose>
            <IconButton aria-label="close" onClick={close}>
              <CloseIcon />
            </IconButton>
          </ModalClose>
        )}
        <MOdalContent hideClose={hideClose ? true : false}>
          {title && <ModalTitle>{title}</ModalTitle>}

          {children}
        </MOdalContent>
      </Dialog>
    </ModalContainer>
  );
};

export default Modal;
