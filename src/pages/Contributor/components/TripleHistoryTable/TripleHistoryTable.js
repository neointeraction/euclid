import React, { useEffect, useState } from "react";

import { Tag, Table, Modal } from "components";
import { TableTagContainer } from "assets/styles/main.styles";

import ViewTripleModal from "../ViewTripleModal";
import { getCompleteContributorHistory, getRecentContributorHistory } from "config/api.service";

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
        accessor: "pmid",
        Cell: (row) => {
          return (
            <div role={"button"} >
              {`${row.row.original.pmid} (${row.row.original.n_evidences ?? 0} Evidences, ${row.row.original.n_triples ?? 0} Triples)`}
            </div>
          );
        },
      },
      {
        Header: "Triple status",
        accessor: "triples_status",
        Cell: (row) => {
          return (
            <TableTagContainer>
              <Tag
                label={row.row.original.triples_status ?? row.row.original.status}
                type={row.row.original.status ? row.row.original.status?.toLowerCase() : row.row.original.triples_status?.toLowerCase}
              />
            </TableTagContainer>
          );
        },
      },
      {
        Header: "Date and time",
        accessor: "data_time",
      },
    ],
    [data]
  );

  const handleData = (result) => {
    setData(result);
  }


  useEffect(() => {
    if (isCompleteList) {
      getCompleteContributorHistory(handleData);
    } else {
      getRecentContributorHistory(handleData);
    }
    setLoading(false);
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
        hideFilter
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
