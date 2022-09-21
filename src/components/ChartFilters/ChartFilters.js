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
                  id: "evidences",
                  optionText: "evidences",
                  value: "evidences"
                },
                {
                  id: "triples_validated",
                  optionText: "triples_validated",
                  value: "triples_validated"
                },
                {
                  id: "triples_committed",
                  optionText: "triples_committed",
                  value: "triples_committed"
                },
                {
                  id: "triples_in_draft",
                  optionText: "triples_in_draft",
                  value: "triples_in_draft"
                },
                {
                  id: "triples_reverted",
                  optionText: "triples_reverted",
                  value: "triples_reverted"
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
                  id: "days",
                  optionText: "days",
                },
                {
                  id: "weeks",
                  optionText: "weeks",
                },
                {
                  id: "months",
                  optionText: "months",
                },
                {
                  id: "year",
                  optionText: "year",
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
            {valueDuration === "days" ?
              <SummaryText>
                <span>Last 10 days</span>
              </SummaryText>
              :
              null}
          </SummaryBlock>
        </Grid>
      </Grid>
    </FilterBlock>
  );
};

export default ChartFilters;
