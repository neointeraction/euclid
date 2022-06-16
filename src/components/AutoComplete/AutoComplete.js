import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";

import { AutoCompleteContainer } from "./autocomplete.styles.";
import { TextField } from "@mui/material";

import { mockData } from "./mock";

const AutoComplete = ({ label, placeholder, isDropdown, options, ...rest }) => {
  return (
    <AutoCompleteContainer>
      <InputLabel size="normal" shrink htmlFor="custom-input">
        {label}
      </InputLabel>
      <Autocomplete
        disablePortal
        options={options ? options : mockData}
        freeSolo={isDropdown ? false : true}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
        {...rest}
      />
    </AutoCompleteContainer>
  );
};

export default AutoComplete;
