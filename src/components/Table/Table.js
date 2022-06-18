import React, { useEffect, useState } from "react";
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  useExpanded,
  useRowSelect,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";
// import "./table.css";

import Filter from "./Filter";
import Search from "./Search";

// import Loader from "../Loader";
import Input from "../Input";
import Dropdown from "../Dropdown";

import SortIcon from "../../assets/images/icons/sort.svg";
import LeftStart from "../../assets/images/icons/LeftArrow.svg";
import RightEnd from "../../assets/images/icons/RightArrow.svg";
import Left from "../../assets/images/icons/left.svg";
import Right from "../../assets/images/icons/right.svg";
import Nodata from "../../assets/images/icons/file-nodata.svg";

import {
  TableSubContainer,
  ObjectFlex,
  CustomTable,
  TableHeader,
} from "./table.styles";

const Table = ({
  columns,
  data,
  isLoading,
  setSelectedRow,
  hidePagination,
  defaultFilter,
  hideFillter,
  hideSearch,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  );

  const {
    getTableProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    selectedFlatRows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setFilter,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: hidePagination ? 100 : 5 },
    },
    useResizeColumns,
    useFlexLayout,
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    let selectedRowList = selectedFlatRows.map((d) => d.original);
    setSelectedRow && setSelectedRow(selectedRowList);
  }, [selectedFlatRows, setSelectedRow]);

  const headerProps = (props, { column }) => getStyles(props, column.align);

  const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

  const getStyles = (props, align = "left") => [
    props,
    {
      style: {
        justifyContent: align === "right" ? "flex-end" : "flex-start",
        alignItems: "flex-start",
        display: "flex",
      },
    },
  ];

  // expanded row content
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <TableSubContainer>
        {row.allCells
          .filter((item) => item.column.Header !== "#")
          .map((item) => (
            <ObjectFlex key={item.value}>
              <h4>{item.column.Header}</h4>
              <p>{item.value}</p>
            </ObjectFlex>
          ))}
      </TableSubContainer>
    ),
    []
  );

  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    setFilter("status", filterValue);
  }, [filterValue, setFilter, setFilterValue]);

  useEffect(() => {
    defaultFilter && setFilterValue(defaultFilter);
  }, [defaultFilter]);

  return (
    <CustomTable>
      <TableHeader hideSearch={hideSearch}>
        {hideSearch ? null : (
          <Search
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
          />
        )}
        {hideFillter ? null : <Filter setFilterValue={setFilterValue} />}
      </TableHeader>

      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map((headerGroup, index) => (
            <div
              {...headerGroup.getHeaderGroupProps()}
              className="tr"
              key={index}
            >
              {headerGroup.headers.map((column, index) => (
                <>
                  <div
                    {...column.getHeaderProps(
                      column.getSortByToggleProps(),
                      headerProps
                    )}
                    className="th"
                    key={index}
                  >
                    {column.render("Header")}
                    {/* Use column.getResizerProps to hook up the events correctly */}
                    {column.canResize && (
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? "isResizing" : ""
                        }`}
                      />
                    )}
                    <span className="sort-icon">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <img src={SortIcon} alt="SortIcon" />
                        ) : (
                          <img src={SortIcon} alt="SortIcon" />
                        )
                      ) : (
                        <img
                          src={SortIcon}
                          alt="SortIcon"
                          // style={{ visibility: "hidden" }}
                        />
                      )}
                    </span>
                  </div>
                </>
              ))}
            </div>
          ))}
        </div>
        <div className="tbody">
          {isLoading ? (
            "loading"
          ) : page.length === 0 ? (
            <div className="empty-table">
              <div className="empty-table-content">
                <img src={Nodata} alt="Nodata" />
                <span className="no-data-text">no data</span>
              </div>
            </div>
          ) : (
            <>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <div key={index}>
                    <div {...row.getRowProps()} className="tr">
                      {row.cells.map((cell, index) => {
                        return (
                          <div
                            {...cell.getCellProps(cellProps)}
                            className={`td ${
                              row.isSelected ? "highlight" : ""
                            }`}
                            key={index}
                          >
                            {cell.render("Cell")}
                          </div>
                        );
                      })}
                    </div>
                    {row.isExpanded ? (
                      <div className="tr">
                        <div
                          className="td inner-td"
                          colSpan={visibleColumns.length}
                        >
                          {/* subrow content */}
                          {renderRowSubComponent({ row })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      {hidePagination ? null : (
        <div className="pagination-custom">
          <div className="pagination-flex">
            <div className="table-input">
              <p className="table-label">Go to page:</p>
              <Input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
              />
            </div>
            <div className="table-select">
              <p className="table-label">Row per page:</p>
              <Dropdown
                value={pageSize}
                options={[
                  { id: 5, optionText: 5 },
                  { id: 10, optionText: 10 },
                  { id: 20, optionText: 20 },
                ]}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              />
            </div>
            <div className="page-count-info">
              <span className="page-count">
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </div>
            <span className="pagination-controls">
              <button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                className="pagination-btn"
              >
                <img src={LeftStart} alt="LeftStart" />
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="pagination-btn"
              >
                <img src={Left} alt="Left" />
              </button>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="pagination-btn"
              >
                <img src={Right} alt="Right" />
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className="pagination-btn"
              >
                <img src={RightEnd} alt="RightEnd" />
              </button>
            </span>
          </div>
        </div>
      )}
    </CustomTable>
  );
};

export default Table;
