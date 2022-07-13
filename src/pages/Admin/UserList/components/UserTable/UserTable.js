import React, { useEffect, useState } from "react";
// import Chip from "@mui/material/Chip";

import { ConfirmationModal, Table, Tag } from "components";
import {
  TableMore,
  TableActionIcon,
  // TableChipContainer,
  TableTagContainer,
} from "assets/styles/main.styles";

import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "assets/images/icons/edit.svg";
// import DeleteIcon from "assets/images/icons/delete.svg";
import More from "assets/images/icons/more.svg";

const UserTable = ({ setSelectedRow, filter, hideSearch, hideFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Role",
        accessor: "userType",
        Cell: (row) => {
          return (
            // <TableChipContainer>
            //   <Chip
            //     label={row.row.original.userType}
            //     size="small"
            //     className="custom-chip"
            //   />
            // </TableChipContainer>

            <TableTagContainer>
              <Tag
                label={row.row.original.userType}
                type={row.row.original.userType.toLowerCase()}
              />
            </TableTagContainer>
          );
        },
      },
      {
        Header: "Triples coded",
        accessor: "Triples coded",
      },
      {
        Header: "Triples Approved",
        accessor: "Triples Approved",
      },
      {
        Header: "Triples Reverted",
        accessor: "Triples Reverted",
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
        userType: "Reviewer",
        "Triples coded": "109",
        "Triples Approved": "125",
        "Triples Reverted": "2374",
      },
      {
        Name: "Esther Howard",
        userType: "Contributor",
        "Triples coded": "129",
        "Triples Approved": "126",
        "Triples Reverted": "4374",
      },
      {
        Name: "Wade Warren",
        userType: "Customer",
        "Triples coded": "139",
        "Triples Approved": "325",
        "Triples Reverted": "2174",
      },
      {
        Name: "Rob Wane",
        userType: "Reviewer",
        "Triples coded": "154",
        "Triples Approved": "115",
        "Triples Reverted": "2334",
      },
      {
        Name: "Chris Martin",
        userType: "Admin",
        "Triples coded": "162",
        "Triples Approved": "125",
        "Triples Reverted": "2322",
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
        title="Block this User ?"
        subtitle="Are you sure you want to do this ?"
        btnText="Block"
        onClick={() => {}}
      />
    </div>
  );
};

export default UserTable;
