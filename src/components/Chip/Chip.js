import Chip from "@mui/material/Chip";
import React from "react";

const CustomChip = ({ content, ...rest }) => {
  return (
    <div>
      <Chip
        label={content.map(({ labelKey, labelValue }) => (
          <React.Fragment key={labelValue}>
            <span>{labelKey}:</span>
            <b style={{ fontWeight: "bold" }}> {labelValue}</b>
          </React.Fragment>
        ))}
        {...rest}
      />
    </div>
  );
};

export default CustomChip;
