import React, { useEffect, useState } from "react";

import { Tag, Table } from "components";
import { TableTagContainer } from "assets/styles/main.styles";
import { Link } from "react-router-dom";
import { getTriplesFlagged } from "config/api.service";

const FlaggedTable = ({ setSelectedRow, filter, hideSearch, hideFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page_num: 0, page_size: 10 });

  const handlePagination = (pagination) => {
    setPagination(pagination);
  }

  const handleData = (result) => {
    setData(result);
  }

  useEffect(() => {
    getTriplesFlagged(pagination, handleData)
  }, [pagination])

  const columns = React.useMemo(
    () => [
      {
        Header: "Triple",
        accessor: "pmid",
        Cell: (row) => {
          return (
            <Link to={`/admin-flagged-triple/${row.row.original.pmid}`} className="table-nav-link">
              {`${row.row.original.pmid} (${row.row.original.n_evidences} Evidences, ${row.row.original.n_triples} Triples)`}
            </Link>
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
                label={row.row.original.triples_status}
                type={row.row.original.triples_status.toLowerCase()}
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
    []
  );

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
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default FlaggedTable;
