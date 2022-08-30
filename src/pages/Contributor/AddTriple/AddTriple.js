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
import { addEvidence, commitTriples, getContext, getEntityLeft, getEntityRight, getPaperSnippets, getRelations, getSavedData, saveTriples, setInvalidSnippet } from "config/api.service";
import { UserContext } from "layout/MainLayout/MainLayout";
import { ROOT, SUBJECT_LEFT, SUBJECT_RIGHT, subRelations } from "config/constants";
import { v4 as uuidv4 } from 'uuid';
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

  const [tripleData, setTripleData] = useState([{
    subjectData: [{
      id: 0, // todo: use unique id. eg uuid library
      selectedValue: "",
      options: [],
      type: ROOT
    }],
    objectData: [{
      id: 0, // todo: use unique id. eg uuid library
      selectedValue: "",
      options: [],
      type: ROOT
    }], relation: "", code: "", contextList: [], evidenceId: ""
  }]);

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

  useEffect(() => {
    getSavedData(snippets.pubid, (result) => {
      console.log(result);
    });
  }, []);

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
    temp?.evidences?.push({ [`${snippets.pubid}_${snippets?.evidences?.length + 1}`]: evidenceToAdd });
    setSnippets(temp);
    addEvidence({ pubid: snippets.pubid, evidence: { [`${snippets?.pubid}_${snippets?.evidences.length + 1}`]: evidenceToAdd } }, addEvidenceCallBack, userDetails.sub)
  }

  const addNewTriple = () => {
    setTripleData(oldData => [...oldData, {
      subjectData: [{
        id: 0, // todo: use unique id. eg uuid library
        selectedValue: "",
        options: [],
        type: ROOT
      }], objectData: [{
        id: 0, // todo: use unique id. eg uuid library
        selectedValue: "",
        options: [],
        type: ROOT
      }], relation: "", code: "", contextList: []
    }]);
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

  const tripleDataUpdate = (subjectData, objectData, relationData, code, index) => {
    let temp = [...tripleData];
    temp[index] = { subjectData: subjectData, objectData: objectData, relation: relationData, code }
    setTripleData(temp);
  }

  const onSubjectValueUpdate = (value, index, innerIndex) => {
    let temp = [...tripleData];
    temp[index].subjectData[innerIndex] = { ...temp[index].subjectData[innerIndex], selectedValue: value?.label }
    temp[index].code = createCode(temp, index);
    temp[index].evidenceId = Object.keys(snippets?.evidences[snippetIndex])[0];
    setTripleData(temp);
  }

  const onObjectValueUpdate = (value, index, innerIndex) => {
    let temp = [...tripleData];
    temp[index].objectData[innerIndex] = { ...temp[index].objectData[innerIndex], selectedValue: value.label }
    temp[index].code = createCode(temp, index);
    temp[index].evidenceId = Object.keys(snippets?.evidences[snippetIndex])[0];
    setTripleData(temp);
  }

  const onAddToLeftOfSubjectType = (element, index, innerIndex) => {
    const entityType = element.selectedValue.split(":");
    const temp = [...tripleData];
    const newData = temp[index].subjectData
    if (subRelations.includes(element.selectedValue)) {
      if (innerIndex === 0) {
        newData.unshift({
          id: uuidv4(),
          selectedValue: "",
          options: element.options,
          type: SUBJECT_LEFT,
          entityType: []
        });
      } else {
        newData.splice(innerIndex - 1, 0, {
          id: uuidv4(),
          selectedValue: "",
          options: element.options,
          type: SUBJECT_LEFT,
          entityType: []
        });
      }
      setTripleData(temp);
    } else {
      getEntityLeft(entityType[0], (result) => {
        if (innerIndex === 0) {
          newData.unshift({
            id: uuidv4(),
            selectedValue: "",
            options: element.options,
            type: SUBJECT_LEFT,
            entityType: result
          });
        } else {
          newData.splice(innerIndex - 1, 0, {
            id: uuidv4(),
            selectedValue: "",
            options: element.options,
            type: SUBJECT_LEFT,
            entityType: result
          });
        }
        setTripleData(temp);
      })
    }
  };

  const onAddToLeftOfObjectType = (element, index, innerIndex) => {
    console.log("element to add to", element);
    const entityType = element.selectedValue.split(":");
    const temp = [...tripleData];
    const newData = temp[index].objectData;
    if (subRelations.includes(element.selectedValue)) {
      if (innerIndex === 0) {
        newData.unshift({
          id: uuidv4(),
          selectedValue: "",
          options: element.options,
          type: SUBJECT_LEFT,
          entityType: []
        });
      } else {
        newData.splice(innerIndex - 1, 0, {
          id: uuidv4(),
          selectedValue: "",
          options: element.options,
          type: SUBJECT_LEFT,
          entityType: []
        });
      }
      setTripleData(temp);
    } else {
      getEntityLeft(entityType[0], (result) => {
        if (innerIndex === 0) {
          newData.unshift({
            id: uuidv4(),
            selectedValue: "",
            options: element.options,
            type: SUBJECT_LEFT,
            entityType: result
          });
        } else {
          newData.splice(innerIndex - 1, 0, {
            id: uuidv4(),
            selectedValue: "",
            options: element.options,
            type: SUBJECT_LEFT,
            entityType: result
          });
        }
        setTripleData(temp);
      })
    }
  };

  const createCode = (temp, index) => {
    let subjectCode = "";
    if (temp[index].subjectData?.length) {
      let subject = temp[index].subjectData;
      for (let i = 0; i < subject?.length; i++) {
        if (subject[i].selectedValue) {
          if (subRelations.includes(subject[i].selectedValue)) {
            subjectCode = `${subjectCode} ${subject[i].selectedValue}'`
          } else {
            let temp = subject[i].selectedValue.split(":");
            if (subRelations.includes(subject[i + 1]?.selectedValue) || subRelations.includes(subject[i - 1]?.selectedValue)) {
              subjectCode = `${subjectCode} (${temp[0]}:'${temp[1]}')`
            } else {
              subjectCode = `${subjectCode} ${temp[0]}:'${temp[1]}'`
            }
          }
        }
      }
    }
    let objectCode = "";
    if (temp[index].objectData?.length) {
      let object = temp[index].objectData;
      for (let i = 0; i < object?.length; i++) {
        if (object[i].selectedValue) {
          if (subRelations.includes(object[i].selectedValue)) {
            objectCode = `${objectCode} ${object[i].selectedValue}'`
          } else {
            let temp = object[i].selectedValue.split(":");
            if (subRelations.includes(object[i + 1]?.selectedValue) || subRelations.includes(object[i - 1]?.selectedValue)) {
              objectCode = `${objectCode} (${temp[0]}:'${temp[1]}')`
            } else {
              objectCode = `${objectCode} ${temp[0]}:'${temp[1]}'`
            }
          }
        }
      }
    }
    return `${subjectCode ? `(${subjectCode})` : ""} ${temp[index].relation} ${objectCode ? `(${objectCode})` : ""}`;
  }

  const handleRelationSelect = (value, index) => {
    const temp = [...tripleData];
    temp[index].relation = value;
    temp[index].code = createCode(temp, index);
    setTripleData(temp);
  }

  const removeSubject = (id, index) => {
    let temp = [...tripleData];
    temp[index].subjectData = temp[index].subjectData.filter((item) => item.id !== id);
    temp[index].code = createCode(temp, index);
    setTripleData(temp);
  }

  const removeObject = (id, index) => {
    let temp = [...tripleData];
    temp[index].objectData = temp[index].objectData.filter((item) => item.id !== id);
    temp[index].code = createCode(temp, index);
    setTripleData(temp);
  }


  const onAddToRightOfSubjectType = (element, index, innerIndex) => {
    console.log("element to add to", element);
    if (subRelations.includes(element.selectedValue)) {
      const temp = [...tripleData];
      const newData = temp[index].subjectData
      newData.splice(innerIndex + 1, 0, {
        id: uuidv4(),
        selectedValue: "",
        options: element.options,
        type: SUBJECT_RIGHT,
        entityType: []
      });
      setTripleData(temp);
    } else {
      const entityType = element.selectedValue.split(":");
      getEntityRight(entityType[0], (result) => {
        const temp = [...tripleData];
        const newData = temp[index].subjectData
        newData.splice(innerIndex + 1, 0, {
          id: uuidv4(),
          selectedValue: "",
          options: element.options,
          type: SUBJECT_RIGHT,
          entityType: result
        });
        setTripleData(temp);
      })
    }
  };

  const onAddToRightOfObjectType = (element, index, innerIndex) => {
    console.log("element to add to", element);
    if (subRelations.includes(element.selectedValue)) {
      const temp = [...tripleData];
      const newData = temp[index].objectData
      newData.splice(innerIndex + 1, 0, {
        id: uuidv4(),
        selectedValue: "",
        options: element.options,
        type: SUBJECT_RIGHT,
        entityType: []
      });
      setTripleData(temp);
    } else {
      const entityType = element.selectedValue.split(":");
      getEntityRight(entityType[0], (result) => {
        const temp = [...tripleData];
        const newData = temp[index].objectData
        newData.splice(innerIndex + 1, 0, {
          id: uuidv4(),
          selectedValue: "",
          options: element.options,
          type: SUBJECT_RIGHT,
          entityType: result
        });
        setTripleData(temp);
      })
    }
  };

  const addFlagAndComment = (comment, index) => {
    let temp = [...tripleData];
    temp[index] = { ...temp[index], comment, flagged: true }
    setTripleData(temp);
  }

  const addContext = (index, data) => {
    let temp = [...tripleData];
    temp[index].contextList.push(data);
    setTripleData(temp);
  }

  const removeContext = (index, innerIndex) => {
    let temp = [...tripleData];
    temp[index].contextList.splice(innerIndex, 1);
    setTripleData(temp);
  }

  const commitAndSave = (type) => {
    let evidenceData = [];
    for (let snippet of snippets?.evidences) {
      let id = Object.keys(snippet)[0];
      const temp = tripleData?.filter((item) => item.evidenceId === id);
      if (temp?.length) {
        let innerData = { id, codes: [] }
        for (let i = 0; i < temp.length; i++) {
          let contextObject = {};
          for (let context of temp[i].contextList) {
            contextObject[context.context] = context.contextValue;
          }
          if (temp[i].flagged === true) {
            innerData.codes.push({ id: `${id}_${i + 1}`, context: contextObject, code: temp[i].code, flagged: true, comment: temp[i].comment })
          } else {
            innerData.codes.push({ id: `${id}_${i + 1}`, context: contextObject, code: temp[i].code })
          }
        }
        evidenceData.push({ id, codes: innerData });
      }
    }
    let data = {
      pubid: snippets?.pubid,
      evidences: evidenceData
    }
    if (type === "COMMIT") {
      commitTriples(data, (result) => {
        console.log("zrk", result)
      })
    } else {
      saveTriples(data, (result) => {
        console.log("zrk", result)
      })
    }
  }

  return (
    <div>
      <a className="link-without-decoration" target="_blank" href={snippets?.url} rel="noreferrer">
        <PageHeader pageTitleText={snippets?.pubid} />
      </a>
      <Section>
        <Box bordered>
          <BodyText dangerouslySetInnerHTML={snippets?.evidences?.length ? { __html: snippets?.evidences[snippetIndex][Object.keys(snippets?.evidences[snippetIndex])[0]] } : { __html: "<div></div>" }} />
          <BodyTextLight>
            {`${snippetIndex + 1}/${snippets?.evidences?.length}`}
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
              key={i}
              chipContent={item.code}
            >
              <TripleCollapseContainer>
                <TripleForm addContext={addContext} removeContext={removeContext} addFlagAndComment={addFlagAndComment} removeObject={removeObject} removeSubject={removeSubject} handleRelationSelect={handleRelationSelect} addSubjectLeft={onAddToLeftOfSubjectType} addSubjectRight={onAddToRightOfSubjectType} addObjectLeft={onAddToLeftOfObjectType} addObjectRight={onAddToRightOfObjectType} onSubjectValueUpdate={onSubjectValueUpdate} onObjectValueUpdate={onObjectValueUpdate} data={item} addNewTriple={addNewTriple} duplicateTriple={duplicateTriple} index={i} relations={relations} tripleDataUpdate={tripleDataUpdate} />
              </TripleCollapseContainer>
            </TrippleCollapsed>
          ))
        ) : (
          tripleData.map((item, i) => (
            <TripleForm addContext={addContext} removeContext={removeContext} removeObject={removeObject} addFlagAndComment={addFlagAndComment} removeSubject={removeSubject} handleRelationSelect={handleRelationSelect} addSubjectLeft={onAddToLeftOfSubjectType} addSubjectRight={onAddToRightOfSubjectType} addObjectLeft={onAddToLeftOfObjectType} addObjectRight={onAddToRightOfObjectType} onObjectValueUpdate={onObjectValueUpdate} onSubjectValueUpdate={onSubjectValueUpdate} data={item} key={i} addNewTriple={addNewTriple} duplicateTriple={duplicateTriple} index={0} relations={relations} tripleDataUpdate={tripleDataUpdate} />
          ))
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
                    onClick={() => commitAndSave("SAVE")}
                  />
                </Grid>
                <Grid item xs={3} textAlign="right">
                  <Button
                    btnText="Commit"
                    variant="contained"
                    onClick={() => commitAndSave("COMMIT")}
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
