import React, { useEffect, useState } from "react";

import { Table } from "components";
// import { TableTagContainer } from "assets/styles/main.styles";
// import { Link } from "react-router-dom";

// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "../../../../assets/images/icons/edit.svg";
// import DeleteIcon from "../../../../assets/images/icons/delete.svg";
// import More from "../../../../assets/images/icons/more.svg";

const PurchaseHistoryTable = ({
  isCompleteList,
  filter,
  hideSearch,
  hideFilter,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Query",
        accessor: "Query",
      },
      {
        Header: "Date and time",
        accessor: "Date and time",
      },
    ],
    []
  );

  useEffect(() => {
    // dummy data
    setData([
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "22-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "11-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        "Date and time": "22-05-2022 at 5:30 PM",
      },
    ]);
    setLoading(false);
    // dummy data
  }, []);

  return (
    <div className="table-container">
      <Table
        columns={columns}
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

export default PurchaseHistoryTable;
