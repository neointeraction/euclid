import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Grid, Checkbox } from "@mui/material";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { IconButton, Tooltip, Chip, TextBlock, Input } from "components";

import {
  CollapseIconWrap,
  IconWithCheckboxBlock,
} from "./trippledCollapsed.styles";
import { CommentBlock } from "assets/styles/main.styles";

const TrippleCollapsed = ({
  chipContent,
  children,
  hasCheckbox,
  hideActions,
  commentData,
  viewOnly,
  setTripleChecked,
}) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    setTripleChecked(event.target.checked);
  };
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
        <IconWithCheckboxBlock>
          {hasCheckbox && (
            <div className="custom-checkbox">
              <Checkbox checked={checked} onChange={handleChange} />
            </div>
          )}

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
        </IconWithCheckboxBlock>

        {!open && <Chip content={chipContent} />}
        {!open && !hideActions && (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item textAlign="right">
              <Tooltip message="Delete" position="top">
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
              <Tooltip message="Edit" position="top">
                <IconButton
                  icon={<EditOutlinedIcon fontSize="small" />}
                  onClick={() => setOpen((prevState) => !prevState)}
                />
              </Tooltip>
            </Grid>
          </Grid>
        )}
      </CollapseIconWrap>
      {open ? null : (
        <>
          {commentData?.map((item) => (
            <CommentBlock>
              <TextBlock label={item.user} value={item.comment} />
            </CommentBlock>
          ))}
          {!viewOnly && checked && (
            <Grid
              container
              spacing={2}
              alignItems="flex-end"
              justifyContent="flex-start"
              style={{ marginTop: 5 }}
            >
              <Grid item xs={4}>
                <Input isMulti label="Comment" />
              </Grid>
            </Grid>
          )}
        </>
      )}

      <Collapse in={open}>
        {open ? (
          <>
            {children}
            {commentData?.map((item) => (
              <CommentBlock>
                <TextBlock label={item.user} value={item.comment} />
              </CommentBlock>
            ))}
            {!viewOnly && checked && (
              <Grid
                container
                spacing={2}
                alignItems="flex-end"
                justifyContent="flex-start"
                style={{ marginTop: 5 }}
              >
                <Grid item xs={4}>
                  <Input isMulti label="Comment" />
                </Grid>
              </Grid>
            )}
          </>
        ) : (
          <>{children}</>
        )}
      </Collapse>
    </Box>
  );
};

TrippleCollapsed.propTypes = {
  children: PropTypes.node,
};

export default TrippleCollapsed;
