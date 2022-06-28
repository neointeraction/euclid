import React, { useState } from "react";
import { Grid } from "@mui/material";

import { PageHeader, Tag, PopoverGrid, Chip } from "components";

import {
  ProvideEvidenceModalBoxContainer,
  Section,
  Box,
  BodyText,
  HighlightText,
  BodyTextLight,
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

// Dummy popover data

function createData(curie, subcurie, prefferedLabel) {
  return { curie, subcurie, prefferedLabel };
}

const rows = [
  createData("SWISSPROT-GRN_HUMAN", "GSK3 beta", "SWISSPROT-GRN_HUMAN"),
  createData("HGNC:4601", "GSK3 beta", "HGNC:4601"),
  createData("SWISSPROT-GRN_HUMAN 2", "GSK3 beta", "SWISSPROT-GRN_HUMAN 2"),
];

const ViewTripleModal = () => {
  // PopoverGrid
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <ProvideEvidenceModalBoxContainer>
      <PageHeader
        isStartAlign
        pageTitleText="234567"
        rightSideContent={<Tag label="Approved" type="approved" />}
      />
      <div>
        <Section>
          <Box bordered>
            <BodyText>
              This skew talks about the main mechanism{" "}
              <HighlightText
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                Alzhiemers disease
              </HighlightText>
              . Phosphorylation of Glycogen synthase kinase 3 beta at Theronine,
              668 increases the degradation of amyloid precursor protein and
              GSK3 beta also phosphorylates tau protein in intact cells.
            </BodyText>
            <BodyTextLight>
              Sergio CM, Ronaldo CA, Exp Brain Res, 2022 March 2. dol:10,
              1007/a0021 - 0022. Online ahead print, PMID - 234678 Review.
            </BodyTextLight>
            {/* Popover grid compnent  */}
            <PopoverGrid
              anchorEl={anchorEl}
              handlePopoverClose={handlePopoverClose}
              data={rows}
            />
          </Box>
        </Section>
        <Box>
          <Grid container spacing={1} justifyContent="flex-start">
            {data1.map((item) => (
              <Grid item xs={2}>
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
      </div>
    </ProvideEvidenceModalBoxContainer>
  );
};

export default ViewTripleModal;
