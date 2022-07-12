import React, { useEffect, useState } from "react";

import { Tag, Table } from "components";
import { TableTagContainer } from "assets/styles/main.styles";
import { Link } from "react-router-dom";

const FlaggedTable = ({ setSelectedRow, filter, hideSearch, hideFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Triple",
        accessor: "Triple",
        Cell: (row) => {
          return (
            <Link to="/admin-flagged-triple" className="table-nav-link">
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
        Triple: "334678 (12 Evidences, 20 Triples)",
        status: "Triples Flagged",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "334678 (12 Evidences, 20 Triples)",
        status: "Triples Flagged",
        "Date and time": "22-05-2022 at 5:30 PM",
      },
      {
        Triple: "334678 (12 Evidences, 20 Triples)",
        status: "Triples Flagged",
        "Date and time": "11-05-2022 at 5:30 PM",
      },
      {
        Triple: "334678 (12 Evidences, 20 Triples)",
        status: "Triples Flagged",
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
        data={data}
        isLoading={loading}
        hidePagination={false}
        defaultFilter={filter}
        hideSearch={hideSearch}
        hideFilter={hideFilter}
        setSelectedRow={setSelectedRow}
      />
    </div>
  );
};

export default FlaggedTable;
