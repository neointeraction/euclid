import React from "react";

import { Tag } from "components";

import { FilterChips } from "../table.styles";

const Filter = ({ setFilterValue }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
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
          onClick={() => setFilterValue("In Draft")}
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
    </div>
  );
};

export default Filter;
