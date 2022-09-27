import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Grid, Checkbox } from "@mui/material";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import React, { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { IconButton, Tooltip, Chip, TextBlock, Input, Button } from "components";

import {
  CollapseIconWrap,
  IconWithCheckboxBlock,
} from "./trippledCollapsed.styles";
import { CommentBlock } from "assets/styles/main.styles";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

const TrippleCollapsed = ({
  chipContent,
  children,
  hasCheckbox,
  hideActions,
  commentData,
  viewOnly,
  setTripleChecked,
  contextValues,
  deleteTriple,
  index,
  duplicateTriple,
  onChange,
  checked,
  addedCommentData,
  addToEditList,
  deleteFromEditList,
  isNew,
  isOpen,
  isFlagged,
  addToOpenList,
  deleteFromOpenList,
  hideCommentBox
}) => {
  const [open, setOpen] = useState(isOpen);
  const [newComment, setNewComment] = useState("");
  const handleChange = (event) => {
    setTripleChecked(event.target.checked);
  };

  const addCommentButton = () => {
    return (
      <Grid item xs={12} textAlign="right" marginTop={0.5}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item xs={3} textAlign="right">
            <Button
              btnText="Add Comment"
              disabled={!checked}
              variant="contained"
              onClick={() => {
                onChange(newComment);
                setNewComment("");
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Box
      sx={{
        borderRadius: 2,
        backgroundColor: "#fff",
        padding: 2,
        marginBottom: "20px",
        transition: "1s box-shadow ease-in-out",
        border: "1px solid #E5E5E5",
        boxShadow: (!hideActions && isNew) ? "0 0 20px #005585" : 0
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
            onClick={() => {
              setOpen((prevState) => !prevState)
              if (!hideActions) {
                deleteFromEditList();
                !!open ? addToOpenList() : deleteFromOpenList();
              }
            }}
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
        {(!open && (typeof (chipContent) === "string") && (chipContent?.trim()).length) ?
          <>
            <Chip isSingleString={true} content={chipContent} />
            {isFlagged === true ?
              <Tooltip message="This triple is Flagged" position="top">
                <IconButton
                  icon={<MarkUnreadChatAltIcon fontSize="small" />}
                />
              </Tooltip> : null}
          </>
          : null}
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
                  onClick={() => { deleteTriple(index) }}
                  icon={<DeleteOutlineOutlinedIcon fontSize="medium" />}
                />
              </Tooltip>
            </Grid>
            <Grid item textAlign="right">
              <Tooltip message="Duplicate" position="top">
                <IconButton
                  icon={<ContentCopyOutlinedIcon fontSize="small" />}
                  onClick={() => {
                    duplicateTriple(index);
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item textAlign="right">
              <Tooltip message="Edit" position="top">
                <IconButton
                  icon={<EditOutlinedIcon fontSize="small" />}
                  onClick={() => {
                    setOpen((prevState) => !prevState)
                    addToEditList();
                  }}
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
          {(addedCommentData?.length && addedCommentData[0].comment_reviewer) ?
            <>
              {addedCommentData?.map((item) => (
                <CommentBlock>
                  <TextBlock label={"Reviewer"} value={item.comment_reviewer} />
                </CommentBlock>
              ))}
            </>
            :
            null
          }
          {!viewOnly && checked && (
            <Grid
              container
              spacing={2}
              alignItems="flex-end"
              justifyContent="flex-start"
              style={{ marginTop: 5 }}
            >
              {!(addedCommentData?.length && addedCommentData[0].comment_reviewer) && !hideCommentBox ?
                < Grid item xs={4}>
                  <Input isMulti label="Comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                {addCommentButton()}
                </Grid>
                :
                null}
            </Grid>
          )}
        </>
      )}

      <Collapse in={open}>
        {open ? (
          <>
            {children}
            {!viewOnly && checked && (
              <Grid
                container
                spacing={2}
                alignItems="flex-end"
                justifyContent="flex-start"
                style={{ marginTop: 5 }}
              >
                {!(addedCommentData?.length && addedCommentData[0].comment_reviewer) && !hideCommentBox ?
                  < Grid item xs={4}>
                    <Input isMulti label="Comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    {addCommentButton()}
                  </Grid>
                  :
                  null}
              </Grid>
            )}
          </>
        ) : (
          <>{children}</>
        )}
      </Collapse>
    </Box >
  );
};

TrippleCollapsed.propTypes = {
  children: PropTypes.node,
};

export default TrippleCollapsed;
