import React from "react";

import { SearchWithIcon } from "components";

const Search = ({ onChange, ...rest }) => {
  return (
    <div>
      {/* <input placeholder="Firstname" onChange={onChange} /> */}
      <SearchWithIcon onChange={onChange} {...rest} />
    </div>
  );
};

export default Search;
