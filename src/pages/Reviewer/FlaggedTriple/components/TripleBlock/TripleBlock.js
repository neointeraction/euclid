import React from "react";
import { Grid } from "@mui/material";
import { Chip, TextBlock } from "components";

import {
  Box,
  PlainTypesItem,
  InfoWithActions,
  CommentBlock,
} from "assets/styles/main.styles";


const TripleBlock = ({ commentData, chipContent, code,addedCommentData }) => {
  return (
    <>
      <Box>
        <Grid container spacing={1} justifyContent="flex-start">
          {chipContent.map((item) => (
            <Grid item>
              <PlainTypesItem noBg noMb>
                <Chip
                  content={[item]}
                />
              </PlainTypesItem>
            </Grid>
          ))}
        </Grid>
        <InfoWithActions>
          <Grid container spacing={1} alignItems="flex-start">
            <Grid item xs={9}>
              <Chip
                content={code}
                isSingleString={true}
              />
            </Grid>
          </Grid>
        </InfoWithActions>
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
      </Box>
    </>
  );
};

export default TripleBlock;
