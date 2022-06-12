import React from "react";

import Fab from "@mui/material/Fab";

import { ButtonContainer } from "./iconButton.styles";

const IconButton = ({ icon, secondary, ...rest }) => {
  return (
    <ButtonContainer type={secondary}>
      <Fab
        size="small"
        color={secondary ? "default" : "secondary"}
        aria-label="add"
        {...rest}
      >
        {icon}
      </Fab>
    </ButtonContainer>
  );
};

export default IconButton;
