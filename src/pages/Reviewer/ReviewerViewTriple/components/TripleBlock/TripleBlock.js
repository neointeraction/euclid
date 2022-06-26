import React from "react";
import { Grid } from "@mui/material";
import { TextBlock, Chip } from "components";

import {
  Box,
  PlainTypesBlock,
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

const data2 = [
  {
    label: "Protein",
    value: "GSK3B",
  },
  {
    label: "Protein modification",
    value: "Phosphoylation",
  },
  {
    label: "Amino acid",
    value: "Threonine",
  },
  {
    label: "Position",
    value: "668",
  },
];

const data3 = [
  {
    label: "Relationship type",
    value: "Increases",
  },
];

const TripleBlock = () => {
  return (
    <>
      <Box>
        <PlainTypesBlock>
          <Grid container spacing={2} justifyContent="center">
            {data1.map((item) => (
              <Grid item xs={2}>
                <PlainTypesItem noBg>
                  <Chip
                    content={[{ labelKey: item.label, labelValue: item.value }]}
                  />
                </PlainTypesItem>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            {data2.map((item) => (
              <Grid item xs={2} textAlign="right">
                <PlainTypesItem>
                  <TextBlock label={item.label} value={item.value} />
                </PlainTypesItem>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} justifyContent="center">
            {data3.map((item) => (
              <Grid item xs={2} textAlign="right">
                <PlainTypesItem noBg>
                  <TextBlock label={item.label} value={item.value} />
                </PlainTypesItem>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} justifyContent="center">
            {data1.map((item) => (
              <Grid item xs={2} textAlign="right">
                <PlainTypesItem>
                  <TextBlock label={item.label} value={item.value} />
                </PlainTypesItem>
              </Grid>
            ))}
          </Grid>
        </PlainTypesBlock>

        <InfoWithActions>
          <Grid container spacing={2} alignItems="flex-start">
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
