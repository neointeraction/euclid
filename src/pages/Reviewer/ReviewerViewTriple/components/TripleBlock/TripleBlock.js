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

const TripleBlock = () => {
  return (
    <>
      <Box>
        <Grid container spacing={1} justifyContent="flex-start">
          {data1.map((item) => (
            <Grid item>
              <PlainTypesItem noBg noMb>
                <Chip
                  content={[{ labelKey: item.label, labelValue: item.value }]}
                />
              </PlainTypesItem>
            </Grid>
          ))}
        </Grid>
        <InfoWithActions>
          <Grid container spacing={1} alignItems="flex-start">
            <Grid item xs={9}>
              <Chip
                content={[
                  { labelKey: "Protein", labelValue: "GSK3BB" },
                  {
                    labelKey: "protein_modification",
                    labelValue: "Phosphorylationn",
                  },
                  { labelKey: " Amino_acid", labelValue: "Threoninee" },
                  { labelKey: "Protein", labelValue: "GSK3B" },
                  {
                    labelKey: "protein_modification",
                    labelValue: "Phosphorylation",
                  },
                ]}
              />
            </Grid>
          </Grid>
        </InfoWithActions>
      </Box>
    </>
  );
};

export default TripleBlock;
