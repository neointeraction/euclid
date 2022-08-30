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
import { INFINITE_SCROLL, NORMAL_SCROLL, RELATION, SUBJECT_LEFT, SUBJECT_RIGHT } from "config/constants";

const ExtendableSubjectTypeForm = ({
  label,
  onAddToRight,
  onAddToLeft,
  options,
  onRemove,
  onChange,
  noBg,
  relations,
  type,
  infiniteScrollFunction,
  searchFunction,
  index,
  setInFocusIndex,
  valueUpdate,
  data
}) => {

  const selectedValueUpdate = (value) => {
    valueUpdate(value, index);
  }

  return (
    <ExtendableSubjectTypeContainer noBg={noBg} onClick={() => (type === RELATION) ? setInFocusIndex(RELATION) : setInFocusIndex(index)}>
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
        <AutoComplete value={data} type={type === RELATION ? NORMAL_SCROLL : INFINITE_SCROLL} options={type === RELATION ? relations : options} onChange={onChange} isDropdown onScrollFunction={infiniteScrollFunction} searchFunction={searchFunction} valueUpdate={selectedValueUpdate} />
        {type !== RELATION ?
          <div className="action-icons-wrapper">
            {type !== SUBJECT_RIGHT && <img src={BackIcon} onClick={onAddToLeft} alt="" />}
            {type !== SUBJECT_LEFT && <img src={NextIcon} onClick={onAddToRight} alt="" />}
          </div>
          :
          <div className="action-icons-wrapper"></div>
        }
      </ExtendableSubjectTypeFormContainer>
    </ExtendableSubjectTypeContainer>
  );
};

export default ExtendableSubjectTypeForm;
