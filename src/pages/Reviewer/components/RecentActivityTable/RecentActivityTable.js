import React, { useEffect, useState } from "react";

import { Tag, Table, Modal } from "components";
import { TableTagContainer } from "assets/styles/main.styles";
import { Link, useNavigate } from "react-router-dom";
import ViewTripleModal from "pages/Contributor/components/ViewTripleModal";
import { FLAGGED, INVALID, VALIDATED } from "config/constants";

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
  dataList,
  setSelectedFilter,
  handlePagination
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewValidatedEvidence, setViewValidatedEvidence] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const navigate = useNavigate();

  const handleValidatedEvidenceClose = () => {
    setViewValidatedEvidence(false);
  }

  

  const handleOnClick = (status, id) => {
    switch (status) {
      case INVALID:
        navigate(`/evidences/${id}`)
        break;
      case FLAGGED:
        navigate(`/flagged-triple/${id}`)
        break;
      case VALIDATED:
        setSelectedId(id);
        setViewValidatedEvidence(true)
        break;
      default:
        navigate(`/triple-view/${id}`)
        break;
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Triple",
        accessor: "pmid",
        Cell: (row) => {
          return (
            <div className="table-nav-link" onClick={() => handleOnClick(row.row.original.triples_status ?? row.row.original.status, row.row.original.pmid)}>
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
                type={row.row.original.status ? row.row.original.status?.toLowerCase() : row.row.original.triples_status?.toLowerCase()}
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
    [dataList]);


  useEffect(() => {
    setLoading(true);
    setData(dataList);
    setLoading(false);
  }, [dataList]);

  return (
    <div className="table-container">
      <Table
        columns={columns}
        data={data ?? []}
        isLoading={loading}
        hidePagination={isCompleteList ? false : true}
        defaultFilter={filter}
        hideSearch={hideSearch}
        isReviewerFilter={true}
        setSelectedFilter={setSelectedFilter}
        handlePagination={handlePagination}
      />
      {viewValidatedEvidence &&
        <Modal
          size="lg"
          open={viewValidatedEvidence}
          close={handleValidatedEvidenceClose}
          children={<ViewTripleModal handleClose={handleValidatedEvidenceClose} id={selectedId} />}
        />}
    </div>
  );
};

export default RecentActivityTable;
