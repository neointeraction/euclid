import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";

import { AutoCompleteContainer } from "./autocomplete.styles.";
import { TextField } from "@mui/material";

import { mockData } from "./mock";
import { INFINITE_SCROLL } from "config/constants";

const AutoComplete = ({ value, label, placeholder, isDropdown, options, onChange, type, onScrollFunction, valueUpdate, searchFunction, onKeyDown, ...rest }) => {
  return (
    <AutoCompleteContainer>
      <InputLabel size="normal" shrink htmlFor="custom-input">
        {label}
      </InputLabel>
      {type !== INFINITE_SCROLL ?
        <Autocomplete
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e, values) => onChange(values)}
          disablePortal
          options={options ? options : mockData}
          freeSolo={isDropdown ? false : true}
          renderInput={(params) => (
            <TextField onKeyDown={onKeyDown} {...params} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} value={value} />
          )}
          {...rest}
        />
        :
        <Autocomplete
          onKeyDown={onKeyDown}

          value={value}
          ListboxProps={{
            onScroll: (e) => {
              const listBoxNode = e.currentTarget;
              if ((Math.round(listBoxNode.scrollTop + listBoxNode.clientHeight) + 100 > listBoxNode.scrollHeight) || (Math.ceil(listBoxNode.scrollTop + listBoxNode.clientHeight) + 100 > listBoxNode.scrollHeight)) {
                onScrollFunction(e);
              }
            }
          }}
          onChange={(e, values) => valueUpdate(values)}
          disablePortal
          options={options ? options : mockData}
          freeSolo={isDropdown ? false : true}
          renderInput={(params) => (
            <TextField {...params} placeholder={placeholder} onChange={(e) => searchFunction(e.target.value)} value={value} />
          )}
          {...rest}
        />
      }
    </AutoCompleteContainer>
  );
};

export default AutoComplete;
