import React from "react";

import { SearchWithIcon } from "components";

const Search = ({ onChange }) => {
  return (
    <div>
      {/* <input placeholder="Firstname" onChange={onChange} /> */}
      <SearchWithIcon name="search" onChange={onChange} />
    </div>
  );
};

export default Search;
