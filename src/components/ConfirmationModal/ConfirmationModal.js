import React from "react";
import { Grid, Typography } from "@mui/material";

import { Modal, Button } from "components";

import { ModalActionButtons } from "./confirm-modal.styles";

const ConfirmationModal = ({
  openModal,
  handleClose,
  title,
  subtitle,
  btnText,
  onClick,
}) => {
  return (
    <div>
      <Modal
        size="sm"
        open={openModal}
        close={handleClose}
        title={title}
        children={
          <>
            <Typography variant="subtitle1">{subtitle}</Typography>
            <ModalActionButtons>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Grid item xs={3} textAlign="right">
                  <Button
                    variant="secondary"
                    btnText="Cancel"
                    onClick={handleClose}
                  />
                </Grid>
                <Grid item xs={3} textAlign="right">
                  <Button
                    variant="contained"
                    btnText={btnText}
                    onClick={onClick}
                  />
                </Grid>
              </Grid>
            </ModalActionButtons>
          </>
        }
      />
    </div>
  );
};

export default ConfirmationModal;
