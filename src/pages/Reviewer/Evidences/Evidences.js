import React, { useState } from "react";

import { Grid } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

import {
  PageHeader,
  PopoverGrid,
  Button,
  Alert,
  ConfirmationModal,
} from "components";

import {
  Section,
  Box,
  BodyText,
  BodyTextLight,
  HighlightText,
  ActionBox,
  AlertWrapper,
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

const Evidences = () => {
  // PopoverGrid
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  //Alert
  const [showAlert, setShowAlert] = useState(false);

  const validClick = () => {
    setShowAlert(true);
  };

  // confirm

  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const handleClickOpenConfirm = () => {
    setOpenModalConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenModalConfirm(false);
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
          <Grid item xs={6} textAlign="right">
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item xs={3} textAlign="right">
                <Button
                  btnText="Delete"
                  variant="secondary"
                  onClick={handleClickOpenConfirm}
                />
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Button
                  btnText="Valid"
                  variant="contained"
                  onClick={validClick}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ActionBox>
      {/* {Alert } */}
      {showAlert && (
        <AlertWrapper>
          <Alert
            type="success"
            message="Evidence marked as valid"
            onClose={() => setShowAlert(false)}
          />
        </AlertWrapper>
      )}
      <ConfirmationModal
        openModal={openModalConfirm}
        handleClose={handleCloseConfirm}
        title="Confirm Delete ?"
        subtitle={"Are you sure you want to delete ?"}
        btnText="Delete"
      />
    </div>
  );
};

export default Evidences;
