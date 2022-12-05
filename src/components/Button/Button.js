import React from "react";

import { Button as MuiButton } from "@mui/material";

import { ButtonContainer } from "./button.styles";

const Button = ({ btnText, size, variant, onClick, ...rest }) => {
  return (
    <ButtonContainer>
      <MuiButton
        size={size ?? "medium"}
        variant={variant}
        onClick={onClick}
        {...rest}
      >
        {btnText}
      </MuiButton>
    </ButtonContainer>
  );
};

export default Button;
