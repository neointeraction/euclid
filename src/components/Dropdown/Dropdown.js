import React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { DropdownContainer } from "./dropdown.styles";

const Dropdown = ({
  label,
  value,
  name,
  isRequired,
  onChange,
  options,
  isDisabled,
  ...rest
}) => {
  return (
    <DropdownContainer>
      <FormControl fullWidth>
        <InputLabel size="normal" shrink htmlFor="custom-dropdown">
          {label}
        </InputLabel>
        <Select
          id="custom-dropdown"
          IconComponent={KeyboardArrowDownIcon}
          value={value}
          onChange={onChange}
          size="small"
          name={name}
          required={isRequired}
          disabled={isDisabled}
          MenuProps={{
            sx: {
              boxShadow: 0,
              outline: 0,
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
          {...rest}
        >
          {options.map((item) => (
            <MenuItem
              className="custom-menuItem"
              value={item.optionText}
              key={item.optionText}
              disableRipple
            >
              {item.optionText}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </DropdownContainer>
  );
};

export default Dropdown;
