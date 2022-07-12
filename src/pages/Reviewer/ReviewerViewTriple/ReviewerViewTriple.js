import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

import { PageHeader, PopoverGrid, TrippleCollapsed, Button } from "components";

import TripleBlock from "./components/TripleBlock";

import {
  Section,
  Box,
  BodyText,
  BodyTextLight,
  HighlightText,
  TripleCollapseContainer,
  ActionBox,
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
const dummyTripleData = [1, 2];

const ReviewerViewTriple = () => {
  const navigate = useNavigate();
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
      <PageHeader subText="Triples" pageTitleText="234567" />
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
      <ActionBox>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid item xs={6} textAlign="left">
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item xs={2} textAlign="left">
                <Button
                  btnText="Back"
                  variant="text"
                  startIcon={<ChevronLeftOutlinedIcon />}
                  onClick={() => console.log("clicked")}
                />
              </Grid>
              <Grid item xs={2} textAlign="left">
                <Button
                  btnText="Next"
                  variant="text"
                  endIcon={<ChevronRightOutlinedIcon />}
                  onClick={() => console.log("clicked")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ActionBox>
      <Section>
        {dummyTripleData.length > 1 ? (
          dummyTripleData.map((item) => (
            <TrippleCollapsed
              hideActions
              hasCheckbox
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
        <ActionBox>
          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item xs={6} textAlign="left">
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="flex-start"
              >
                <Grid item xs={2} textAlign="left">
                  <Button
                    btnText="Back"
                    variant="secondary"
                    onClick={() => navigate(-1)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Grid item xs={3} textAlign="right">
                  <Button
                    btnText="Approve"
                    variant="outlined"
                    onClick={() => console.log("clicked")}
                  />
                </Grid>
                <Grid item xs={3} textAlign="right">
                  <Button
                    btnText="Modify This"
                    variant="contained"
                    onClick={() => navigate("/edit-triple")}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ActionBox>
      </Section>
    </div>
  );
};

export default ReviewerViewTriple;
