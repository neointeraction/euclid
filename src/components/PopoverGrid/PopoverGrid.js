import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popover from "@mui/material/Popover";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  CustomTableContainer,
  EvidenceDetailModalBoxWrap,
} from "./popover-grid.styles";

const PopoverGrid = ({ handlePopoverClose, anchorEl, data }) => {
  const open = Boolean(anchorEl);
  return (
    <>
      <Popover
        className="popper-custom"
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        elevation={0}
        style={{
          pointerEvents: "none",
        }}
      >
        <EvidenceDetailModalBoxWrap>
          <CustomTableContainer>
            <Table
              size="small"
              aria-label="evidence details table"
              className="p-table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left" padding="none"></TableCell>
                  <TableCell
                    align="left"
                    padding="none"
                    className="th-tabel-cell"
                  >
                    ID(Curie)
                  </TableCell>
                  <TableCell
                    align="left"
                    padding="none"
                    className="th-tabel-cell"
                  >
                    Preferred label
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={row.curie}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      className="table-row-cell"
                      align="left"
                      style={{
                        padding: "3px 10px",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      className="table-row-cell"
                      style={{ padding: "3px" }}
                      component="th"
                      align="left"
                    >
                      <span style={{ textTransform: "uppercase" }}>
                        {row.curie}
                      </span>
                      <p className="red-p">{row.subcurie}</p>
                    </TableCell>
                    <TableCell
                      className="table-row-cell"
                      align="left"
                      style={{
                        padding: "3px",
                      }}
                    >
                      <div className="with-info-icon-wrap">
                        <span>{row.prefferedLabel}</span>
                        <InfoOutlinedIcon fontSize="small" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CustomTableContainer>
        </EvidenceDetailModalBoxWrap>
      </Popover>
    </>
  );
};

export default PopoverGrid;
