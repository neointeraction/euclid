import React, { useState } from "react";

//import { Grid } from "@mui/material";

import { PageHeader, PopoverGrid, TrippleCollapsed, Tag } from "components";

import TripleBlock from "./components/TripleBlock";

import {
  Section,
  Box,
  BodyText,
  BodyTextLight,
  HighlightText,
  TripleCollapseContainer,
} from "assets/styles/main.styles";

// Dummy popover data

function createData(curie, subcurie, prefferedLabel) {
  return { curie, subcurie, prefferedLabel };
}

const rows = [
  createData("SWISSPROT-GRN_HUMAN", "GSK3 beta", "SWISSPROT-GRN_HUMAN"),
  createData("HGNC:4601", "GSK3 beta", "HGNC:4601"),
  createData("SWISSPROT-GRN_HUMAN 2", "GSK3 beta", "SWISSPROT-GRN_HUMAN 2"),
];

// Dummy popover data end

// Dummy Triple Data
const dummyTripleData = [1];

const ViewTriple = () => {
  // PopoverGrid
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <PageHeader
        subText="Validated Triples"
        pageTitleText="234567"
        rightSideContent={<Tag label="Approved" type="approved" />}
      />
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
            668 increases the degradation of amyloid precursor protein and GSK3
            beta also phosphorylates tau protein in intact cells.
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
      <Section>
        {dummyTripleData.length > 1 ? (
          dummyTripleData.map((item) => (
            <TrippleCollapsed
              key={item}
              chipContent={[
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
            >
              <TripleCollapseContainer>
                <TripleBlock />
              </TripleCollapseContainer>
            </TrippleCollapsed>
          ))
        ) : (
          <TripleBlock />
        )}
      </Section>
    </div>
  );
};

export default ViewTriple;
