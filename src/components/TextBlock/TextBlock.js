import React from "react";

import { TextBlockContainer, Label, Value } from "./text-block.styles";

const TextBlock = ({ label, value }) => {
  return (
    <TextBlockContainer>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </TextBlockContainer>
  );
};

export default TextBlock;
