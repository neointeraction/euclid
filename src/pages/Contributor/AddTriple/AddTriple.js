import React, { useState } from "react";

import { Grid } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddIcon from "@mui/icons-material/Add";

import {
  PageHeader,
  Button,
  Dropdown,
  AutoComplete,
  IconButton,
  TrippleCollapsed,
  ExtendableSubjectTypeForm,
  Tooltip,
  Modal,
  Alert,
} from "components";

import EvidenceModalContent from "./components/EvidenceModalContent";
import CommentModalContent from "./components/CommentModalContent";

import {
  Section,
  Box,
  BodyText,
  BodyTextLight,
  ActionBox,
  TypesBlock,
  MultiFormContainer,
  InfoWithActions,
  AlertWrapper,
} from "assets/styles/main.styles";

const AddTriple = () => {
  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [openModalComment, setOpenModalComment] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleClickOpenConfirm = () => {
    setOpenModalComment(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCloseComment = () => {
    setOpenModalComment(false);
  };

  //Alert
  const [showAlert, setShowAlert] = useState(false);

  const notReleventClick = () => {
    setShowAlert(true);
  };

  // Forms
  const [state, setState] = useState({
    context: "",
  });

  const handleChange = (event) => {
    setState({ context: event.target.value });
  };

  const [multipleSubjectTypes, setMultipleSubjectTypes] = useState([
    {
      id: 0, // todo: use unique id. eg uuid library
      selectedValue: "",
      options: ["Option one for el one", "Option two for el two"],
    },
  ]);

  const onAddToLeftOfSubjectType = (element) => {
    console.log("element to add to", element);
    const newData = [...multipleSubjectTypes];
    // todo: Add constrain to only element to the left
    newData.unshift({
      id: element.id + 1,
      selectedValue: "",
      options: element.options,
    });
    setMultipleSubjectTypes(newData);
  };

  const onAddToRightOfSubjectType = (element) => {
    console.log("element to add to", element);
    const newData = [...multipleSubjectTypes];
    newData.push({
      id: element.id + 1,
      selectedValue: "",
      options: element.options,
    });
    setMultipleSubjectTypes(newData);
  };

  const onRemoveFromMultipleSubjectType = (elementId) => {
    if (multipleSubjectTypes.length <= 1) return;
    const filteredList = multipleSubjectTypes.filter(
      (item) => item.id !== elementId
    );
    setMultipleSubjectTypes(filteredList);
  };

  return (
    <div>
      <PageHeader pageTitleText="Add Triples" />
      <Section>
        <Box bordered>
          <BodyText>
            This skew talks about the main mechanism Alzhiemers disease.
            Phosphorylation of Glycogen synthase kinase 3 beta at Theronine, 668
            increases the degradation of amyloid precursor protein and GSK3 beta
            also phosphorylates tau protein in intact cells.
          </BodyText>
          <BodyTextLight>
            Sergio CM, Ronaldo CA, Exp Brain Res, 2022 March 2. dol:10,
            1007/a0021 - 0022. Online ahead print, PMID - 234678 Review.
          </BodyTextLight>
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
                    btnText="Skip"
                    variant="outlined"
                    onClick={() => console.log("clicked")}
                  />
                </Grid>
                <Grid item xs={3} textAlign="right">
                  <Button
                    btnText="Not relevent/Invalid"
                    variant="secondary"
                    onClick={notReleventClick}
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
        <Box>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={3}>
              <Dropdown
                label="Select context"
                onChange={handleChange}
                value={state.context}
                options={[
                  {
                    id: "option a",
                    optionText: "Option A",
                  },
                  {
                    id: "option b",
                    optionText: "Option B",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={5}>
              <AutoComplete
                label="Search or enter items"
                placeholder="Enter here..."
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                btnText="Add"
                variant="contained"
                onClick={() => console.log("clicked")}
              />
            </Grid>
          </Grid>
          <TypesBlock>
            <MultiFormContainer>
              {multipleSubjectTypes.map((subjectType) => (
                <React.Fragment key={subjectType.id}>
                  <ExtendableSubjectTypeForm
                    label="Subject type"
                    onAddToLeft={() => onAddToLeftOfSubjectType(subjectType)}
                    onAddToRight={() => onAddToRightOfSubjectType(subjectType)}
                    onChange={(_e, value) =>
                      console.log("selected value === ", {
                        value,
                        selectedValue: value,
                      })
                    }
                    options={subjectType.options}
                    onRemove={
                      multipleSubjectTypes.length > 1
                        ? () => {
                            onRemoveFromMultipleSubjectType(subjectType.id);
                          }
                        : undefined
                    }
                  />
                </React.Fragment>
              ))}
            </MultiFormContainer>
            <MultiFormContainer>
              {multipleSubjectTypes.map((subjectType) => (
                <React.Fragment key={subjectType.id}>
                  <ExtendableSubjectTypeForm
                    label="Relationship type"
                    onAddToLeft={() => onAddToLeftOfSubjectType(subjectType)}
                    onAddToRight={() => onAddToRightOfSubjectType(subjectType)}
                    onChange={(_e, value) =>
                      console.log("selected value === ", {
                        value,
                        selectedValue: value,
                      })
                    }
                    options={subjectType.options}
                    onRemove={
                      multipleSubjectTypes.length > 1
                        ? () => {
                            onRemoveFromMultipleSubjectType(subjectType.id);
                          }
                        : undefined
                    }
                  />
                </React.Fragment>
              ))}
            </MultiFormContainer>
            <MultiFormContainer>
              {multipleSubjectTypes.map((subjectType) => (
                <React.Fragment key={subjectType.id}>
                  <ExtendableSubjectTypeForm
                    label="Object type"
                    onAddToLeft={() => onAddToLeftOfSubjectType(subjectType)}
                    onAddToRight={() => onAddToRightOfSubjectType(subjectType)}
                    onChange={(_e, value) =>
                      console.log("selected value === ", {
                        value,
                        selectedValue: value,
                      })
                    }
                    options={subjectType.options}
                    onRemove={
                      multipleSubjectTypes.length > 1
                        ? () => {
                            onRemoveFromMultipleSubjectType(subjectType.id);
                          }
                        : undefined
                    }
                  />
                </React.Fragment>
              ))}
            </MultiFormContainer>
          </TypesBlock>
          <InfoWithActions>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={9}>
                <TrippleCollapsed
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
                  <div style={{ margin: "20px" }}>
                    Click again to Collapse me. I am the child to hide :)
                  </div>
                </TrippleCollapsed>
              </Grid>
              <Grid item xs={3}>
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Grid item xs={2} textAlign="right">
                    <Tooltip message="Add Comment" position="top">
                      <IconButton
                        onClick={handleClickOpenConfirm}
                        icon={<AddCommentOutlinedIcon fontSize="small" />}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Tooltip message="Duplicate" position="top">
                      <IconButton
                        icon={<ContentCopyOutlinedIcon fontSize="small" />}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Tooltip message="Add Triple" position="top">
                      <IconButton icon={<AddIcon fontSize="medium" />} />
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </InfoWithActions>
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
                <Grid item xs={3} textAlign="right">
                  <Button
                    btnText="Add new"
                    variant="outlined"
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
                    btnText="Save"
                    variant="outlined"
                    onClick={() => console.log("clicked")}
                  />
                </Grid>
                <Grid item xs={3} textAlign="right">
                  <Button
                    btnText="Commit"
                    variant="contained"
                    onClick={() => console.log("clicked")}
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
        children={<EvidenceModalContent />}
      />
      {/* Add Comment  */}
      <Modal
        size="sm"
        open={openModalComment}
        close={handleCloseComment}
        title="Add Comment"
        children={<CommentModalContent />}
      />
      {/* {Alert } */}
      {showAlert && (
        <AlertWrapper>
          <Alert
            type="success"
            message="Evidence marked as Not Relevent"
            onClose={() => setShowAlert(false)}
          />
        </AlertWrapper>
      )}
    </div>
  );
};

export default AddTriple;
