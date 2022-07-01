import React, { useEffect, useState } from "react";

import { Tag, Table } from "components";
import { TableTagContainer } from "assets/styles/main.styles";
import { Link } from "react-router-dom";

// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "../../../../assets/images/icons/edit.svg";
// import DeleteIcon from "../../../../assets/images/icons/delete.svg";
// import More from "../../../../assets/images/icons/more.svg";

const RecentActivityTable = ({
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
            <Link
              to={
                row.row.original.status === "Invalid Evidence"
                  ? "/evidences"
                  : row.row.original.status === "Triples Flagged"
                  ? "/flagged-triple"
                  : "/triple-view"
              }
              className="table-nav-link"
            >
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
        status: "Triples Validated",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "234678 (12 Evidences, 20 Triples)",
        status: "Invalid Evidence",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "334678 (12 Evidences, 20 Triples)",
        status: "Triples Flagged",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "434678 (12 Evidences, 20 Triples)",
        status: "Triples Reverted",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "534678 (12 Evidences, 20 Triples)",
        status: "Triples Validated",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "534678 (12 Evidences, 20 Triples)",
        status: "Triples Validated",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "434678 (12 Evidences, 20 Triples)",
        status: "Triples Reverted",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "234678 (12 Evidences, 20 Triples)",
        status: "Invalid Evidence",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "334678 (12 Evidences, 20 Triples)",
        status: "Triples Flagged",
        "Date and time": "22-05-2022 at 5:30 PM",
      },
      {
        Triple: "234678 (12 Evidences, 20 Triples)",
        status: "Invalid Evidence",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "334678 (12 Evidences, 20 Triples)",
        status: "Triples Flagged",
        "Date and time": "11-05-2022 at 5:30 PM",
      },
      {
        Triple: "234678 (12 Evidences, 20 Triples)",
        status: "Invalid Evidence",
        "Date and time": "19-05-2022 at 5:30 PM",
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
        data={isCompleteList ? data : data.slice(0, 5)}
        isLoading={loading}
        hidePagination={isCompleteList ? false : true}
        defaultFilter={filter}
        hideSearch={hideSearch}
        isReviewerFilter={true}
      />
    </div>
  );
};

export default RecentActivityTable;
