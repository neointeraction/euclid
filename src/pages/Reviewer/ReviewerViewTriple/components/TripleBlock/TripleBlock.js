import React from "react";
import { Grid } from "@mui/material";
import { Chip } from "components";

import {
  Box,
  PlainTypesItem,
  InfoWithActions,
} from "assets/styles/main.styles";

const data1 = [
  {
    label: "Disease",
    value: "Alzheimer's disease",
  },
  {
    label: "Species",
    value: "Human beings",
  },
];

const TripleBlock = ({ code, chipContent }) => {
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
      </Box>
    </>
  );
};

export default TripleBlock;
