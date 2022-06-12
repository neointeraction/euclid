import React, { useEffect, useState } from "react";
import Table from "components/Table";

// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "../../../../assets/images/icons/edit.svg";
// import DeleteIcon from "../../../../assets/images/icons/delete.svg";
// import More from "../../../../assets/images/icons/more.svg";

const TripleHistoryTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Triple",
        accessor: "Triple",
      },
      {
        Header: "Triple status",
        accessor: "Triple status",
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
        "Triple status": "Approved",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "234678 (12 Evidences, 20 Triples)",
        "Triple status": "Committed",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "334678 (12 Evidences, 20 Triples)",
        "Triple status": "In Draft",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
      {
        Triple: "434678 (12 Evidences, 20 Triples)",
        "Triple status": "Approved",
        "Date and time": "19-05-2022 at 5:30 PM",
      },
    ]);
    setLoading(false);
    // dummy data
  }, []);

  return (
    <div className="table-container">
      <Table columns={columns} data={data} isLoading={loading} hidePagination />
    </div>
  );
};

export default TripleHistoryTable;
