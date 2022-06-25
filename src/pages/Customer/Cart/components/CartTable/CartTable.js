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
        accessor: "Query",
        maxWidth: 600,
        minWidth: 400,
      },
      {
        Header: "Triples",
        accessor: "Triples",
      },
      {
        Header: "Entities",
        accessor: "Entities",
      },
      {
        Header: "Amount",
        accessor: "Amount",
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

  useEffect(() => {
    // dummy data
    setData([
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        Triples: "109",
        Entities: "125",
        Amount: "$2374",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        Triples: "129",
        Entities: "126",
        Amount: "$4374",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        Triples: "139",
        Entities: "325",
        Amount: "$2174",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        Triples: "154",
        Entities: "115",
        Amount: "$2334",
      },
      {
        Query: "Disease: Neuro AND Species: Human Beings",
        Triples: "162",
        Entities: "125",
        Amount: "$2322",
      },
    ]);
    setLoading(false);
    // dummy data
  }, []);

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
      />
      <ConfirmationModal
        openModal={openModalConfirm}
        handleClose={handleCloseConfirm}
        title="Remove from Cart ?"
        subtitle="Are you sure you want to do this ?"
        btnText="Remove"
        onClick={() => {}}
      />
    </div>
  );
};

export default CartTable;
