import React, { useEffect, useState } from "react";

import { Table } from "components";
import { getCompleteSearchDetails, getLastSearchDetails } from "config/api.service";
// import { TableTagContainer } from "assets/styles/main.styles";
// import { Link } from "react-router-dom";

// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "../../../../assets/images/icons/edit.svg";
// import DeleteIcon from "../../../../assets/images/icons/delete.svg";
// import More from "../../../../assets/images/icons/more.svg";

const SearchHistoryTable = ({
  isCompleteList,
  filter,
  hideSearch,
  hideFilter,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    isCompleteList ?
      getCompleteSearchDetails((result) => {
        setData(result);
        setLoading(false);
      })
      :
      getLastSearchDetails((result) => {
        setData(result);
        setLoading(false);
      })
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Query",
        accessor: "query",
        maxWidth: isCompleteList ? 600 : 300,
        minWidth: isCompleteList ? 250 : 200,
      },
      {
        Header: "Date and time",
        accessor: "datetime",
      },
    ],
    [isCompleteList]
  );

  const filterColumns = () => {
    return isCompleteList
      ? columns
      : columns.filter(
        (item) => item.Header === "Query" || item.Header === "Date and time"
      );
  };


  return (
    <div className="table-container">
      <Table
        columns={isCompleteList ? columns : filterColumns()}
        data={isCompleteList ? data : data.slice(0, 5)}
        isLoading={loading}
        hidePagination={isCompleteList ? false : true}
        defaultFilter={filter}
        hideSearch={hideSearch}
        hideFilter={hideFilter}
      />
    </div>
  );
};

export default SearchHistoryTable;
