import React from "react";

import { Tag } from "components";

import { FilterChips } from "../table.styles";
import { FLAGGED, INVALID, REVERTED, VALIDATED } from "config/constants";

const Filter = ({ setFilterValue, reviewerFilter }) => {
  return (
    <div>
      {reviewerFilter ? (
        <FilterChips>
          <span>Filter By:</span>
          <Tag label="All" type="all" onClick={() => setFilterValue("all")} />
          <Tag
            label="Validated"
            type="approved"
            onClick={() => setFilterValue(VALIDATED)}
          />
          <Tag
            label="Flagged"
            type="in draft"
            onClick={() => {
              setFilterValue(FLAGGED);
            }}
          />
          <Tag
            label="Invalid Evidence"
            type="committed"
            onClick={() => setFilterValue(INVALID)}
          />
          <Tag
            label="Reverted"
            type="reverted"
            onClick={() => setFilterValue(REVERTED)}
          />
        </FilterChips>
      ) : (
        <FilterChips>
          <span>Filter By:</span>
          <Tag label="All" type="all" onClick={() => setFilterValue("")} />
          <Tag
            label="Approved"
            type="approved"
            onClick={() => setFilterValue("Approved")}
          />
          <Tag
            label="In Draft"
            type="in draft"
            onClick={() => {
              setFilterValue("In Draft");
            }}
          />
          <Tag
            label="Committed"
            type="committed"
            onClick={() => setFilterValue("Committed")}
          />
          <Tag
            label="Reverted"
            type="reverted"
            onClick={() => setFilterValue("Reverted")}
          />
        </FilterChips>
      )}
    </div>
  );
};

export default Filter;
