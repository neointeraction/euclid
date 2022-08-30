import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

import {
  ProvideEvidenceModalBoxContainer,
  ModalActionButtons,
} from "assets/styles/main.styles";
import Input from "components/Input";
import Button from "components/Button";

const CommentModalContent = ({ handleClose, onChange }) => {
  const [comment, setComment] = useState("");

  return (
    <ProvideEvidenceModalBoxContainer>
      <Typography variant="subtitle1">Enter your comment here</Typography>
      <div>
        <Input
          style={{
            maxHeight: "134px",
            height: "134px",
          }}
          isMulti
          placeholder="Enter Here"
          onChange={(e) => setComment(e.target.value)}
        />
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
              <Button variant="contained" btnText="Save" onClick={() => {
                onChange(comment)
                handleClose();
              }} />
            </Grid>
          </Grid>
        </ModalActionButtons>
      </div>
    </ProvideEvidenceModalBoxContainer>
  );
};

export default CommentModalContent;
