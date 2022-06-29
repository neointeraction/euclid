import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { IconButton, Tooltip, Chip } from "components";

import { CollapseIconWrap } from "./trippledCollapsed.styles";

const TrippleCollapsed = ({ chipContent, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        borderRadius: 2,
        backgroundColor: "#fff",
        padding: 2,
        marginBottom: "20px",
        border: "1px solid #E5E5E5",
      }}
    >
      <CollapseIconWrap>
        <IconButton
          onClick={() => setOpen((prevState) => !prevState)}
          style={{ marginRight: "6px" }}
          icon={
            !open ? (
              <ChevronRightOutlinedIcon fontSize="medium" />
            ) : (
              <KeyboardArrowUpIcon fontSize="medium" />
            )
          }
        />
        {!open && <Chip content={chipContent} />}
        {!open && (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item textAlign="right">
              <Tooltip message="Add Comment" position="top">
                <IconButton
                  onClick={() => {}}
                  icon={<DeleteOutlineOutlinedIcon fontSize="medium" />}
                />
              </Tooltip>
            </Grid>
            <Grid item textAlign="right">
              <Tooltip message="Duplicate" position="top">
                <IconButton
                  icon={<ContentCopyOutlinedIcon fontSize="small" />}
                  onClick={() => {}}
                />
              </Tooltip>
            </Grid>
            <Grid item textAlign="right">
              <Tooltip message="Add Triple" position="top">
                <IconButton
                  icon={<EditOutlinedIcon fontSize="small" />}
                  onClick={() => setOpen((prevState) => !prevState)}
                />
              </Tooltip>
            </Grid>
          </Grid>
        )}
      </CollapseIconWrap>
      <Collapse in={open}>{children}</Collapse>
    </Box>
  );
};

TrippleCollapsed.propTypes = {
  children: PropTypes.node,
};

export default TrippleCollapsed;
