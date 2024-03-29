import React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import FilterListIcon from "@mui/icons-material/FilterList";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import {
  CardContainer,
  CardCount,
  CardText,
  CardFlex,
  CardFilter,
  CardIcon,
  CardContainerWithOutClick,
  NormalCardContainer,
} from "./card.styles";

const Card = ({ color, count, title, onClick, enableFilter, hasIcon, selectedIcon, isNotClickable, height }) => {
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
    <>
      {isNotClickable ?
        <CardContainerWithOutClick color={color} height={height}>
          <CardCount color={color}>
            {count}
            {hasIcon ?
              <CardIcon>
                {selectedIcon}
              </CardIcon> : null}
          </CardCount>
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
                            : color === "orange"
                              ? "#FAAD14"
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
        </CardContainerWithOutClick>
        : !height ?
          <CardContainer color={color} onClick={onClick}>
            <CardCount color={color}>
              {count}
              {hasIcon ?
                <CardIcon>
                  {selectedIcon}
                </CardIcon> : null}
            </CardCount>
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
                              : color === "orange"
                                ? "#FAAD14"
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
          :
          <NormalCardContainer color={color} onClick={onClick} >
            <CardFlex>
              <CardText>{title}</CardText>
            </CardFlex>
          </NormalCardContainer>
      }
    </>
  );
};

export default Card;
