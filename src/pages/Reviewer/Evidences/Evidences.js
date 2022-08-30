import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Grid } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

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
import { deleteEvidence, getEvidence, validateEvidence } from "config/api.service";
import { INVALID } from "config/constants";

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
  let navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [evidenceInFocus, setEvidenceInFocus] = useState(null);
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


  // confirm

  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const handleClickOpenConfirm = () => {
    setOpenModalConfirm(true);
  };

  const handleCloseConfirm = (evidenceId) => {
    setOpenModalConfirm(false);
    evidenceId && setEvidenceInFocus(evidenceId)
  };

  const handleData = (result) => {
    const temp = result?.evidences?.filter(item => item.status === INVALID);
    setData(temp);
  }

  useEffect(() => {
    if (id) {
      getEvidence(id, handleData);
    }
  }, [id]);

  const handleValidate = (evidenceId) => {
    const data = { pubid: id, evidence_no: evidenceId };
    validateEvidence(data, (result) => {
      setShowAlert(true);
    });
  }

  const handleDelete = () => {
    const data = { pubid: id, evidence_no: evidenceInFocus };
    deleteEvidence(data, (result) => { navigate("/recent-activity") })
  }

  return (
    <div>
      <PageHeader subText="Triples" pageTitleText={id} />
      {data?.map((item, index) => {
        return (
          <>
            <Section>
              <Box bordered>
                <BodyText dangerouslySetInnerHTML={{ __html: item?.text }} />
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
                        btnText="Delete"
                        variant="secondary"
                        onClick={() => handleClickOpenConfirm(item.id)}
                      />
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <Button
                        btnText="Valid"
                        variant="contained"
                        onClick={() => handleValidate(item.id)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ActionBox>
          </>
        )
      })}
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
        handleClose={() => handleCloseConfirm()}
        title="Confirm Delete ?"
        subtitle={"Are you sure you want to delete ?"}
        btnText="Delete"
        onClick={() => handleDelete()}
      />
    </div>
  );
};

export default Evidences;
