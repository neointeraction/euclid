import React, { useEffect, useState } from "react";

import { Tag, Table } from "components";
import { TableTagContainer } from "assets/styles/main.styles";
import { Link } from "react-router-dom";

// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "../../../../assets/images/icons/edit.svg";
// import DeleteIcon from "../../../../assets/images/icons/delete.svg";
// import More from "../../../../assets/images/icons/more.svg";

const TripleHistoryTable = ({
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
        Header: "Triple",
        accessor: "Triple",
        Cell: (row) => {
          return (
            <Link to="/add-triple" className="table-nav-link">
              {row.row.original.Triple}
            </Link>
          );
        },
      },
      {
        Header: "Triple status",
        accessor: "status",
        Cell: (row) => {
          return (
            <TableTagContainer>
              <Tag
                label={row.row.original.status}
                type={row.row.original.status.toLowerCase()}
              />
            </TableTagContainer>
          );
        },
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
        Triple: "134678 (12 Evidences, 20 Triples)",
        status: "Approved",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "234678 (12 Evidences, 20 Triples)",
        status: "Committed",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "334678 (12 Evidences, 20 Triples)",
        status: "In Draft",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "434678 (12 Evidences, 20 Triples)",
        status: "Reverted",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "534678 (12 Evidences, 20 Triples)",
        status: "Approved",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "534678 (12 Evidences, 20 Triples)",
        status: "Approved",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "434678 (12 Evidences, 20 Triples)",
        status: "Reverted",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "234678 (12 Evidences, 20 Triples)",
        status: "Committed",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "334678 (12 Evidences, 20 Triples)",
        status: "In Draft",
        "Date and time": "22-05-2022 at 5:30 PM",
      },
      {
        Triple: "234678 (12 Evidences, 20 Triples)",
        status: "Committed",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "334678 (12 Evidences, 20 Triples)",
        status: "In Draft",
        "Date and time": "11-05-2022 at 5:30 PM",
      },
      {
        Triple: "234678 (12 Evidences, 20 Triples)",
        status: "Committed",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "334678 (12 Evidences, 20 Triples)",
        status: "In Draft",
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
        hidePagination
        defaultFilter={filter}
        hideSearch={hideSearch}
      />
    </div>
  );
};

export default TripleHistoryTable;