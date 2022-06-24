import React from "react";
import Typography from "@mui/material/Typography";

import AutoComplete from "components/AutoComplete";

import NextIcon from "../../assets/images/icons/subject-type-next.svg";
import BackIcon from "../../assets/images/icons/subject-type-back.svg";

import { CloseOutlined } from "@mui/icons-material";
import {
  ExtendableSubjectTypeContainer,
  ExtendableSubjectTypeFormContainer,
  ExtendableSubjectTypeFormHeaderWrap,
} from "./extendableSubjectType.styles";

const ExtendableSubjectTypeForm = ({
  label,
  onAddToRight,
  onAddToLeft,
  options,
  onRemove,
  onChange,
  noBg,
}) => {
  return (
    <ExtendableSubjectTypeContainer noBg={noBg}>
      <ExtendableSubjectTypeFormContainer>
        <ExtendableSubjectTypeFormHeaderWrap>
          <Typography variant="body1">{label} </Typography>
          {onRemove && (
            <CloseOutlined
              style={{ cursor: "pointer" }}
              onClick={onRemove}
              fontSize="medium"
            />
          )}
        </ExtendableSubjectTypeFormHeaderWrap>
        <AutoComplete options={options} onChange={onChange} isDropdown />
        <div className="action-icons-wrapper">
          <img src={BackIcon} onClick={onAddToLeft} alt="" />
          <img src={NextIcon} onClick={onAddToRight} alt="" />
        </div>
      </ExtendableSubjectTypeFormContainer>
    </ExtendableSubjectTypeContainer>
  );
};

export default ExtendableSubjectTypeForm;
