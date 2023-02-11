import React from "react";
import Typography from "@mui/material/Typography";

import AutoComplete from "components/AutoComplete";

import { CloseOutlined } from "@mui/icons-material";
import {
  ExtendableSubjectTypeContainer,
  ExtendableSubjectTypeFormContainer,
  ExtendableSubjectTypeFormHeaderWrap,
} from "./extendableSubjectType.styles";
import {
  INFINITE_SCROLL,
  NORMAL_SCROLL,
  RELATION,
  SUBJECT_LEFT,
  SUBJECT_RIGHT,
} from "config/constants";
import BackIcon from "components/BackIcon/BackIcon";
import NextIcon from "components/NextIcon/NextIcon";

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
  data,
  isRoot,
}) => {
  
  const selectedValueUpdate = (value) => {
    valueUpdate(value, index);
  };

  const leftAndRightButton = () => {
    return (
      <>
        <BackIcon onClick={onAddToLeft} />
        <NextIcon onClick={onAddToRight} />
      </>
    );
  };

  return (
    <ExtendableSubjectTypeContainer
      bgColor={isRoot ? "#A3BEDF" : null}
      noBg={noBg}
      onClick={() =>
        type === RELATION ? setInFocusIndex(RELATION) : setInFocusIndex(index)
      }
    >
      <ExtendableSubjectTypeFormContainer>
        <ExtendableSubjectTypeFormHeaderWrap>
          <Typography variant="body1">{label} </Typography>
          {onRemove && !isRoot && (
            <CloseOutlined
              style={{ cursor: "pointer" }}
              onClick={onRemove}
              fontSize="medium"
            />
          )}
        </ExtendableSubjectTypeFormHeaderWrap>
        <AutoComplete
          value={data}
          type={type === RELATION ? NORMAL_SCROLL : INFINITE_SCROLL}
          options={type === RELATION ? relations : options}
          onChange={onChange}
          isDropdown
          onScrollFunction={infiniteScrollFunction}
          searchFunction={searchFunction}
          valueUpdate={selectedValueUpdate}
        />
        {type !== RELATION ? (
          <>
            {data && data?.trim().length ? (
              <div className="action-icons-wrapper">
                {" "}
                {leftAndRightButton()}
              </div>
            ) : (
              <div className="action-icons-wrapper-disabled">
                {leftAndRightButton()}
              </div>
            )}
          </>
        ) : (
          <div className="action-icons-wrapper"></div>
        )}
      </ExtendableSubjectTypeFormContainer>
    </ExtendableSubjectTypeContainer>
  );
};

export default ExtendableSubjectTypeForm;
