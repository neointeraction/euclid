import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Autocomplete from '@mui/material/Autocomplete';

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
}) => {
  return (
    <ExtendableSubjectTypeContainer>
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

ExtendableSubjectTypeForm.propTypes = {
  options: PropTypes.array.isRequired,
  onAddToLeft: PropTypes.func,
  onAddToRight: PropTypes.func,
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
};

export default ExtendableSubjectTypeForm;
