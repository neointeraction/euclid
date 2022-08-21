import React, { useContext, useEffect, useState } from "react";

import { Grid } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

import {
  PageHeader,
  Button,
  Modal,
  Alert,
  PopoverGrid,
  ConfirmationModal,
  TrippleCollapsed,
} from "components";

import EvidenceModalContent from "./components/EvidenceModalContent";

import TripleForm from "./components/TripleForm";

import {
  Section,
  Box,
  BodyText,
  BodyTextLight,
  ActionBox,
  AlertWrapper,
  HighlightText,
  TripleCollapseContainer,
} from "assets/styles/main.styles";
import { addEvidence, getContext, getPaperSnippets, getRelations, setInvalidSnippet } from "config/api.service";
import { UserContext } from "layout/MainLayout/MainLayout";

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


const AddTriple = () => {
  // Modal
  const [openModal, setOpenModal] = useState(false);

  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const { userDetails } = useContext(UserContext);

  const [snippets, setSnippets] = useState({});

  const [snippetIndex, setSnippetIndex] = useState(0);

  const [evidenceToAdd, setEvidenceToAdd] = useState("");

  const [tripleData, setTripleData] = useState([{}]);

  const [relations, setRelations] = useState([]);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClickOpenConfirm = () => {
    setOpenModalConfirm(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCloseConfirm = () => {
    setOpenModalConfirm(false);
  };

  //Alert
  const [showAlert, setShowAlert] = useState(false);

  const notRelevantClick = () => {
    handleClickOpenConfirm();
  };

  const notRelevantConfirm = () => {
    handleCloseConfirm(false);
    setInvalidSnippet({ pubid: snippets.pubid, evidence_num: snippetIndex }, setShowAlert(true), userDetails.sub);
  }

  // PopoverGrid
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const getSnippets = (result) => {
    setSnippets(result);
  }

  useEffect(() => {
    if (userDetails) {
      getPaperSnippets(getSnippets, userDetails.sub);
    }
  }, [userDetails]);

  const snippetControl = (type) => {
    if (type === "next") {
      setSnippetIndex(oldData => oldData < (snippets?.evidences.length - 1) ? oldData + 1 : oldData);
    } else {
      setSnippetIndex(oldData => oldData > 0 ? oldData - 1 : oldData);
    }
  }

  const addEvidenceCallBack = (result) => {
    console.log(result);
  }

  const addEvidenceText = () => {
    let temp = { ...snippets };
    temp?.evidences?.push(evidenceToAdd);
    setSnippets(temp);
    addEvidence({ pubid: snippets.pubid, evidence: evidenceToAdd }, addEvidenceCallBack, userDetails.sub)
  }

  const addNewTriple = () => {
    setTripleData(oldData => [...oldData, {}]);
  }

  const duplicateTriple = (index) => {
    let temp = [...tripleData];
    setTripleData(oldData => [...oldData, temp[index]]);
  }

  const deleteTriple = (index) => {
    let temp = [...tripleData];
    temp.splice(index, 1);
    setTripleData(temp);
  }

  const relationCallBack = (result) => {
    setRelations(result)
  }

  useEffect(() => {
    getRelations(relationCallBack);
  }, [])

  return (
    <div>
      <PageHeader pageTitleText={`Add Triples (${snippets?.pubid})`} onClick={() => addNewTriple()} />
      <Section>
        <Box bordered>
          <BodyText dangerouslySetInnerHTML={snippets?.evidences?.length ? { __html: snippets?.evidences[snippetIndex][Object.keys(snippets?.evidences[snippetIndex])[0]] } : { __html: "<div></div>" }} />
          <BodyTextLight>
            <a href={snippets?.url} target="_blank" rel="noreferrer">{snippets?.url}</a>
          </BodyTextLight>
          {/* Popover grid compnent  */}
          <PopoverGrid
            anchorEl={anchorEl}
            handlePopoverClose={handlePopoverClose}
            data={rows}
          />
        </Box>
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
                    onClick={() => snippetControl("prev")}
                  />
                </Grid>
                <Grid item xs={2} textAlign="left">
                  <Button
                    btnText="Next"
                    variant="text"
                    endIcon={<ChevronRightOutlinedIcon />}
                    onClick={() => snippetControl("next")}
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
                    btnText="Not relevent/Invalid"
                    variant="secondary"
                    onClick={notRelevantClick}
                  />
                </Grid>
                <Grid item xs={3} textAlign="right">
                  <Button
                    btnText="Add Evidence"
                    variant="secondary"
                    onClick={handleClickOpen}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ActionBox>
      </Section>
      <Section>
        {tripleData.length > 1 ? (
          tripleData.map((item, i) => (
            <TrippleCollapsed
              deleteTriple={deleteTriple}
              duplicateTriple={duplicateTriple}
              index={i}
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
                <TripleForm addNewTriple={addNewTriple} duplicateTriple={duplicateTriple} index={i} relations={relations} />
              </TripleCollapseContainer>
            </TrippleCollapsed>
          ))
        ) : (
          <TripleForm addNewTriple={addNewTriple} duplicateTriple={duplicateTriple} index={0} relations={relations} />
        )}

        <ActionBox>
          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item xs={6} textAlign="right">
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Grid item xs={3} textAlign="right">
                  <Button
                    btnText="Save"
                    variant="outlined"
                    onClick={() => console.log("clicked")}
                  />
                </Grid>
                <Grid item xs={3} textAlign="right">
                  <Button
                    btnText="Commit"
                    variant="contained"
                    onClick={handleClickOpenConfirm}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ActionBox>
      </Section>
      {/* Add Evidence  */}
      <Modal
        size="sm"
        open={openModal}
        close={handleClose}
        title="Provide Evidence"
        children={<EvidenceModalContent handleClose={handleClose} addEvidence={addEvidenceText} evidence={evidenceToAdd} setEvidenceToAdd={setEvidenceToAdd} />}
      />

      {/* {Alert } */}
      {
        showAlert && (
          <AlertWrapper>
            <Alert
              type="success"
              message="Evidence marked as Not Relevent"
              onClose={() => setShowAlert(false)}
            />
          </AlertWrapper>
        )
      }
      <ConfirmationModal
        openModal={openModalConfirm}
        handleClose={handleCloseConfirm}
        title="Confirm Mark irrelevant"
        subtitle={"Are you sure you want to mark this as Irrelevant ?"}
        btnText="Mark As Irrelevant"
        onClick={() => notRelevantConfirm()}
      />
    </div >
  );
};

export default AddTriple;
