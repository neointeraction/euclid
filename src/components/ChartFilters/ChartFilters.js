import React from "react";
import Grid from "@mui/material/Grid";
import { Dropdown } from "components";

import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

import {
  FilterBlock,
  SummaryBlock,
  SummaryIcon,
  SummaryText,
} from "./chart-filter.styles";

const ChartFilters = ({
  byType,
  byDuration,
  valueType,
  handleChangeType,
  handleChangeDuration,
  valueDuration,
  isDown,
  averageText,
}) => {
  return (
    <FilterBlock>
      <Grid container spacing={0} alignItems="center" justifyContent="flex-end">
        {byType && (
          <Grid textAlign="right" className="filter-grids">
            <Dropdown
              onChange={handleChangeType}
              value={valueType}
              options={[
                {
                  id: "Evidences",
                  optionText: "Evidences",
                },
                {
                  id: "Triples Validated",
                  optionText: "Triples Validated",
                },
                {
                  id: "Triples Committed",
                  optionText: "Triples Committed",
                },
                {
                  id: "Triples in Draft",
                  optionText: "Triples in Draft",
                },
                {
                  id: "Triples Reverted",
                  optionText: "Triples Reverted",
                },
              ]}
            />
          </Grid>
        )}
        {byDuration && (
          <Grid textAlign="right" className="filter-grids">
            <Dropdown
              onChange={handleChangeDuration}
              value={valueDuration}
              options={[
                {
                  id: "By days",
                  optionText: "By days",
                },
                {
                  id: "By weeks",
                  optionText: "By weeks",
                },
                {
                  id: "By months",
                  optionText: "By months",
                },
                {
                  id: "By years",
                  optionText: "By years",
                },
              ]}
            />
          </Grid>
        )}
        <Grid item className="filter-grids" textAlign="right">
          <SummaryBlock>
            <SummaryIcon>
              {isDown ? (
                <ArrowDownwardOutlinedIcon
                  fontSize="small"
                  htmlColor="#F5222D"
                />
              ) : (
                <ArrowUpwardOutlinedIcon fontSize="small" htmlColor="#59A14F" />
              )}
            </SummaryIcon>
            <SummaryText>
              <span>Last 10 days</span>
              {averageText}
            </SummaryText>
          </SummaryBlock>
        </Grid>
      </Grid>
    </FilterBlock>
  );
};

export default ChartFilters;
