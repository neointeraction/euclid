import React, { useEffect, useState } from "react";

import { ConfirmationModal, Table } from "components";
import { TableMore, TableActionIcon } from "assets/styles/main.styles";

import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "assets/images/icons/edit.svg";
// import DeleteIcon from "assets/images/icons/delete.svg";
import More from "assets/images/icons/more.svg";

const CustomerTable = ({ setSelectedRow, filter, hideSearch, hideFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Evidences downloaded",
        accessor: "Evidences downloaded",
      },
      {
        Header: "Triples downloaded",
        accessor: "Triples downloaded",
      },
      {
        Header: "Amount paid",
        accessor: "Amount paid",
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
                  onClick={() => {
                    handleClickOpenConfirm();
                    handleClose();
                  }}
                  disableRipple
                >
                  <TableActionIcon>
                    <BlockOutlinedIcon fontSize="small" />
                  </TableActionIcon>
                  Block
                </MenuItem>
              </Menu>
            </>
          );
        },
        width: 100,
        disableSortBy: true,
      },
    ],
    []
  );

  useEffect(() => {
    // dummy data
    setData([
      {
        Name: "Jane Cooper",
        "Evidences downloaded": "109",
        "Triples downloaded": "125",
        "Amount paid": "$2374",
      },
      {
        Name: "Esther Howard",
        "Evidences downloaded": "129",
        "Triples downloaded": "126",
        "Amount paid": "$4374",
      },
      {
        Name: "Wade Warren",
        "Evidences downloaded": "139",
        "Triples downloaded": "325",
        "Amount paid": "$2174",
      },
      {
        Name: "Rob Wane",
        "Evidences downloaded": "154",
        "Triples downloaded": "115",
        "Amount paid": "$2334",
      },
      {
        Name: "Chris Martin",
        "Evidences downloaded": "162",
        "Triples downloaded": "125",
        "Amount paid": "$2322",
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
        hidePagination={true}
        defaultFilter={filter}
        hideSearch={hideSearch}
        hideFilter={hideFilter}
        setSelectedRow={setSelectedRow}
      />
      <ConfirmationModal
        openModal={openModalConfirm}
        handleClose={handleCloseConfirm}
        title="Block this Customer ?"
        subtitle="Are you sure you want to do this ?"
        btnText="Block"
        onClick={() => {}}
      />
    </div>
  );
};

export default CustomerTable;
