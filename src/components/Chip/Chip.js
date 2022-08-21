import Chip from "@mui/material/Chip";
import React from "react";

const CustomChip = ({ content, isSingleString, ...rest }) => {
  return (
    <div>
      {!isSingleString ?
        <Chip
          label={content.map(({ labelKey, labelValue }) => (
            <React.Fragment key={labelValue}>
              <span>{labelKey}:</span>
              <b style={{ fontWeight: "bold" }}> {labelValue}</b>
            </React.Fragment>
          ))}
          {...rest}
        />
        :
        <Chip
          label={content}
        />
      }
    </div>
  );
};

export default CustomChip;
