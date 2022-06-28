import React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import FilterListIcon from "@mui/icons-material/FilterList";

import {
  CardContainer,
  CardCount,
  CardText,
  CardFlex,
  CardFilter,
} from "./card.styles";

const Card = ({ color, count, title, onClick, enableFilter }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  return (
    <CardContainer color={color} onClick={onClick}>
      <CardCount color={color}>{count}</CardCount>
      <CardFlex>
        <CardText>{title}</CardText>
        {enableFilter && (
          <CardFilter onClick={handleClick} value="total">
            <FilterListIcon
              htmlColor={
                color === "purple"
                  ? "#7e57c2"
                  : color === "green"
                  ? "#16A034"
                  : color === "red"
                  ? "#FF6870"
                  : color === "blue"
                  ? "#005585"
                  : "#aaa"
              }
            />
          </CardFilter>
        )}

        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.10))",
              mt: 0,
            },
          }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <MenuItem onClick={handleClose} value={"total"}>
            Total Count
          </MenuItem>
          <MenuItem onClick={handleClose} value={"last 7 days"}>
            Last 7 Days
          </MenuItem>
          <MenuItem onClick={handleClose} value={"this month"}>
            This Month
          </MenuItem>
          <MenuItem onClick={handleClose} value={"last month"}>
            Last Month
          </MenuItem>
        </Menu>
      </CardFlex>
    </CardContainer>
  );
};

export default Card;
