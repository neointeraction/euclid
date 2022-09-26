import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ConfirmationModal, Table } from "components";
import { Checkbox } from "@mui/material";
import { TableMore, TableActionImage } from "assets/styles/main.styles";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "assets/images/icons/edit.svg";
import DeleteIcon from "assets/images/icons/delete.svg";
import More from "assets/images/icons/more.svg";
import { getCartItems } from "config/api.service";

const TableCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <Checkbox ref={resolvedRef} {...rest} className="table-checkbox" />
    </>
  );
});

const CartTable = ({ setSelectedRow, filter, hideSearch, hideFilter }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({ page_num: 0, page_size: 10 });

  const handlePagination = (pagination) => {
    setPagination(pagination);
  }

  useEffect(() => {
    getCartItems(pagination, (result) => setData(result))
  }, [pagination])

  const columns = React.useMemo(
    () => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <TableCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <TableCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
        width: 4,
        disableSortBy: true,
      },
      {
        Header: "Query",
        accessor: "query",
        maxWidth: 600,
        minWidth: 400,
      },
      {
        Header: "Triples",
        accessor: "triples",
      },
      {
        Header: "Entities",
        accessor: "entities",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },

      {
        id: "action",
        Header: "Action",
        accessor: "Action",
        Cell: (row) => {
          const [anchorEl, setAnchorEl] = React.useState(null);
          const open = Boolean(anchorEl);
          const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
          };
          const handleClose = () => {
            setAnchorEl(null);
          };

          return (
            <>
              <TableMore onClick={handleClick}>
                <img src={More} alt="More" />
              </TableMore>
              <Menu
                id="basic-menu-table"
                className="menu-table"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => navigate("/query-triple")}
                  className="table-menu-item"
                >
                  <TableActionImage
                    src={EditIcon}
                    alt="EditIcon"
                    className="table-action-icons"
                  />
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClickOpenConfirm();
                    handleClose();
                  }}
                  disableRipple
                >
                  <TableActionImage
                    src={DeleteIcon}
                    alt="DeleteIcon"
                    className="table-action-icons"
                  />
                  Delete
                </MenuItem>
              </Menu>
            </>
          );
        },
        width: 100,
        disableSortBy: true,
      },
    ],
    [navigate]
  );

  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const handleClickOpenConfirm = () => {
    setOpenModalConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenModalConfirm(false);
  };

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
      <ConfirmationModal
        openModal={openModalConfirm}
        handleClose={handleCloseConfirm}
        title="Remove from Cart ?"
        subtitle="Are you sure you want to do this ?"
        btnText="Remove"
        onClick={() => { }}
      />
    </div>
  );
};

export default CartTable;
