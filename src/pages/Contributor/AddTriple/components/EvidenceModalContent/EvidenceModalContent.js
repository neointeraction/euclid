import React from "react";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

import {
  ProvideEvidenceModalBoxContainer,
  ModalActionButtons,
} from "assets/styles/main.styles";
import Input from "components/Input";
import Button from "components/Button";

const EvidenceModalContent = () => {
  return (
    <ProvideEvidenceModalBoxContainer>
      <Typography variant="subtitle1">Subject Type</Typography>
      <div>
        <Input
          style={{
            maxHeight: "134px",
            height: "134px",
          }}
          isMulti
          placeholder="Enter Here"
        />
        <ModalActionButtons>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item xs={3} textAlign="right">
              <Button variant="secondary" btnText="Cancel" />
            </Grid>
            <Grid item xs={3} textAlign="right">
              <Button variant="contained" btnText="Save" />
            </Grid>
          </Grid>
        </ModalActionButtons>
      </div>
    </ProvideEvidenceModalBoxContainer>
  );
};

export default EvidenceModalContent;
