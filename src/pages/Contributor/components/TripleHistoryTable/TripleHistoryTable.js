import React, { useEffect, useState } from "react";

import { Tag, Table, Modal } from "components";
import { TableTagContainer } from "assets/styles/main.styles";

import ViewTripleModal from "../ViewTripleModal";

const TripleHistoryTable = ({
  isCompleteList,
  filter,
  hideSearch,
  hideFilter,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Triple",
        accessor: "Triple",
        Cell: (row) => {
          return (
            <div className="table-nav-link" onClick={handleClickOpen}>
              {row.row.original.Triple}
            </div>
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
        hidePagination={isCompleteList ? false : true}
        defaultFilter={filter}
        hideSearch={hideSearch}
      />
      <Modal
        size="lg"
        open={openModal}
        close={handleClose}
        children={<ViewTripleModal handleClose={handleClose} />}
      />
    </div>
  );
};

export default TripleHistoryTable;
