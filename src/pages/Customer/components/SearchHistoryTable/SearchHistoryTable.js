import React, { useEffect, useState } from "react";

import { Table } from "components";
import { getCompleteSearchDetails, getLastSearchDetails } from "config/api.service";
import { useNavigate } from "react-router-dom";

const SearchHistoryTable = ({
  isCompleteList,
  filter,
  hideSearch,
  hideFilter,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page_num: 0, page_size: 10 });
  const navigate = useNavigate(); 

  const handlePagination = (pagination) => {
    setPagination(pagination);
  }

  useEffect(() => {
    setLoading(true);
    isCompleteList ?
      getCompleteSearchDetails(pagination, (result) => {
        setData(result);
        setLoading(false);
      })
      :
      getLastSearchDetails((result) => {
        setData(result);
        setLoading(false);
      })
  }, [pagination]);

  const handleRedirect = (id) =>{
    navigate("/query-triple",{state:{id}});
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Query",
        accessor: "query",
        maxWidth: isCompleteList ? 600 : 300,
        minWidth: isCompleteList ? 250 : 200,
        Cell: (row) => {
          return (
            <div className="table-nav-link" onClick={()=>handleRedirect(row.row.original.query_id)} >
              {row.row.original.query}
            </div>
          );
        },
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
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default SearchHistoryTable;
