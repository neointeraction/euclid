import React, { useContext, useEffect, useRef, useState } from "react";

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
} from "components";

import TrippleCollapsed from '../AddTriple/components/TrippleCollapsed';

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
import { addEvidence, commitTriples, getContext, getDraft, getEntityLeft, getEntityRight, getPaperSnippets, getRelations, getSavedData, saveTriples, setInvalidSnippet } from "config/api.service";
import { UserContext } from "layout/MainLayout/MainLayout";
import { ROOT, SUBJECT_LEFT, SUBJECT_RIGHT, subRelations } from "config/constants";
import { v4 as uuidv4 } from 'uuid';
import Loading from "components/Loading";

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

  const [openModalConfirmCommit, setOpenModalConfirmCommit] = useState(false);

  const { userDetails } = useContext(UserContext);

  const [snippets, setSnippets] = useState({});

  const [snippetIndex, setSnippetIndex] = useState(0);

  const [evidenceToAdd, setEvidenceToAdd] = useState("");

  const [alertMessage, setAlertMessage] = useState("");

  const [alertType, setAlertType] = useState("");

  const [loading, setLoading] = useState(false);

  const [editList, setEditList] = useState([]);

  const [openList, setOpenList] = useState([]);

  const [tripleDataToCommit, setTripleDataToCommit] = useState({});

  const ref = useRef(null);

  const handleScrollToNew = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [tripleData, setTripleData] = useState({
    pubid: snippets.pubid, evidences: [{
      id: "", codes: [{
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
      }]
    }]
  });



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
    setInvalidSnippet({ pubid: snippets.pubid, evidence_num: snippetIndex }, () => {
      setAlertType("success");
      setAlertMessage("Evidence marked as Not Relevent");
      setShowAlert(true)
    }, userDetails.sub);
  }

  // PopoverGrid
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const getSnippets = (res) => {
    let result = {};
    if (res?.length) {
      result = res[0];
    }
    if (result?.evidences?.length) {
      setTripleData({
        pubid: result.pubid,
        evidences: result.evidences?.map((item) => {
          return {
            id: Object.keys(item)[0], codes: [{
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
              }], relation: "", code: "", contextList: [], evidenceId: "", isNew: false
            }]
          }
        })
      })
    }
    setSnippets(result);
    setLoading(false);
  }

  useEffect(() => {
    if (userDetails) {
      setLoading(true);
      getPaperSnippets(getSnippets);
    }
  }, [userDetails]);

  useEffect(() => {
    getSavedData(snippets.pubid, (result) => {
      console.log(result);
    });
  }, []);

  const snippetControl = (type) => {
    if (type === "next") {
      if (snippetIndex < (snippets?.evidences.length - 1)) {
        setSnippetIndex(oldData => oldData + 1);
      } else {
        setAlertType("error");
        setAlertMessage("Please commit for viewing next publication");
        setShowAlert(true);
      }
    } else {
      setSnippetIndex(oldData => oldData > 0 ? oldData - 1 : oldData);
    }
  }

  const addEvidenceCallBack = (result) => {
    let data = {
      id: `${snippets.pubid}_${snippets.evidences.length + 1}`,
      codes: [{
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
        }], relation: "", code: "", contextList: [], evidenceId: "", id: `${snippets.pubid}_${snippets.evidences.length + 1}_1`
      }]
    }
    let temp = { ...snippets };
    temp?.evidences?.push({ [`${snippets.pubid}_${snippets?.evidences?.length + 1}`]: evidenceToAdd });
    setSnippets(temp);
    let tempTripleData = { ...tripleData }
    tempTripleData.evidences.push(data);
    setTripleData(tempTripleData);
    setAlertType("success");
    setAlertMessage("Added Evidence Successfully");
    setShowAlert(true);
  }

  const addEvidenceText = () => {
    addEvidence({ pubid: snippets.pubid, evidence: { [`${snippets?.pubid}_${snippets?.evidences.length + 1}`]: evidenceToAdd } }, addEvidenceCallBack, userDetails.sub)
  }

  const fadeOutFunction = () => {
    setTimeout(() => {
      let newTemp = { ...tripleData }
      newTemp.evidences[snippetIndex].codes = newTemp.evidences[snippetIndex].codes.map((item) => {
        return {
          id: item.id,
          subjectData: item.subjectData,
          objectData: item.objectData,
          relation: item.relation,
          code: item.code,
          contextList: item.contextList,
          evidenceId: item.evidenceId,
          isNew: false
        }
      })
      setTripleData(newTemp);
    }, 1000);
  }

  const addNewTriple = () => {
    let temp = { ...tripleData }
    const tempId = uuidv4();
    setOpenList([tempId]);
    setEditList([tempId]);
    temp.evidences[snippetIndex].codes.push({
      id: tempId,
      subjectData: [{
        id: 0, // todo: use unique id. eg uuid library
        selectedValue: "",
        options: [],
        type: ROOT,
      }],
      objectData: [{
        id: 0, // todo: use unique id. eg uuid library
        selectedValue: "",
        options: [],
        type: ROOT
      }], relation: "", code: "", contextList: [], evidenceId: "", isNew: true
    })
    setTripleData(temp);
    handleScrollToNew();
    fadeOutFunction();
  }

  const duplicateTriple = (index) => {
    let tempTripleData = { ...tripleData };
    const id = uuidv4();
    setOpenList([id]);
    setEditList([id]);
    let temp = tempTripleData.evidences[snippetIndex].codes;
    temp.splice(index + 1, 0, { ...temp[index], id, isNew: true });
    setTripleData(tempTripleData);
    fadeOutFunction();
  }

  const deleteTriple = (index) => {
    let tempTripleData = { ...tripleData };
    let temp = tempTripleData.evidences[snippetIndex].codes;
    temp.splice(index, 1);
    setTripleData(tempTripleData);
  }

  const relationCallBack = (result) => {
    setRelations(result)
  }

  useEffect(() => {
    getRelations(relationCallBack);
  }, [])

  const tripleDataUpdate = (subjectData, objectData, relationData, code, index) => {
    let tempTripleData = { ...tripleData };
    let temp = tempTripleData.evidences[snippetIndex].codes;
    temp[index] = { subjectData: subjectData, objectData: objectData, relation: relationData, code }
    setTripleData(tempTripleData);
  }

  const onSubjectValueUpdate = (value, index, innerIndex) => {
    let tempTripleData = { ...tripleData };
    let temp = tempTripleData.evidences[snippetIndex].codes;
    temp[index].subjectData[innerIndex] = { ...temp[index].subjectData[innerIndex], selectedValue: value?.label }
    temp[index].code = createCode(temp, index);
    temp[index].evidenceId = Object.keys(snippets?.evidences[snippetIndex])[0];
    setTripleData(tempTripleData);
  }

  const onObjectValueUpdate = (value, index, innerIndex) => {
    let tempTripleData = { ...tripleData };
    let temp = tempTripleData.evidences[snippetIndex].codes;
    temp[index].objectData[innerIndex] = { ...temp[index].objectData[innerIndex], selectedValue: value.label }
    temp[index].code = createCode(temp, index);
    temp[index].evidenceId = Object.keys(snippets?.evidences[snippetIndex])[0];
    setTripleData(tempTripleData);
  }

  const onAddToLeftOfSubjectType = (element, index, innerIndex) => {
    const entityType = element.selectedValue.split(":");
    let tempTripleData = { ...tripleData };
    let temp = tempTripleData.evidences[snippetIndex].codes;
    const newData = temp[index].subjectData
    if (subRelations.includes(element.selectedValue)) {
      if (innerIndex === 0) {
        newData.unshift({
          id: uuidv4(),
          selectedValue: "",
          options: element.options,
          type: findTypeOfNode(element.type, SUBJECT_LEFT),
          entityType: []
        });
      } else {
        newData.splice(innerIndex, 0, {
          id: uuidv4(),
          selectedValue: "",
          options: element.options,
          type: findTypeOfNode(element.type, SUBJECT_LEFT),
          entityType: []
        });
      }
      setTripleData(tempTripleData);
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
          newData.splice(innerIndex, 0, {
            id: uuidv4(),
            selectedValue: "",
            options: element.options,
            type: SUBJECT_LEFT,
            entityType: result
          });
        }
        setTripleData(tempTripleData);
      })
    }
  };

  const onAddToLeftOfObjectType = (element, index, innerIndex) => {
    console.log("element to add to", element);
    const entityType = element.selectedValue.split(":");
    let tempTripleData = { ...tripleData };
    let temp = tempTripleData.evidences[snippetIndex].codes;
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
        newData.splice(innerIndex, 0, {
          id: uuidv4(),
          selectedValue: "",
          options: element.options,
          type: SUBJECT_LEFT,
          entityType: []
        });
      }
      setTripleData(tempTripleData);
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
          newData.splice(innerIndex, 0, {
            id: uuidv4(),
            selectedValue: "",
            options: element.options,
            type: SUBJECT_LEFT,
            entityType: result
          });
        }
        setTripleData(tempTripleData);
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
            subjectCode = `${subjectCode} ${subject[i].selectedValue}`
          } else {
            let [first, ...rest] = subject[i].selectedValue.split(":");
            if (subRelations.includes(subject[i + 1]?.selectedValue) || subRelations.includes(subject[i - 1]?.selectedValue)) {
              subjectCode = `${subjectCode} (${first}:'${rest.join(':')}')`
            } else {
              subjectCode = `${subjectCode} ${first}:'${rest.join(':')}'`
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
            objectCode = `${objectCode} ${object[i].selectedValue}`
          } else {
            let [first, ...rest] = object[i].selectedValue.split(":");
            if (subRelations.includes(object[i + 1]?.selectedValue) || subRelations.includes(object[i - 1]?.selectedValue)) {
              objectCode = `${objectCode} (${first}:'${rest.join(':')}')`
            } else {
              objectCode = `${objectCode} ${first}:'${rest.join(':')}'`
            }
          }
        }
      }
    }
    return `${subjectCode ? `(${subjectCode})` : ""} ${temp[index].relation} ${objectCode ? `(${objectCode})` : ""}`;
  }

  const handleRelationSelect = (value, index) => {
    let tempTripleData = { ...tripleData };
    let temp = tempTripleData.evidences[snippetIndex].codes;
    temp[index].relation = value;
    temp[index].code = createCode(temp, index);
    setTripleData(tempTripleData);
  }

  const removeSubject = (id, index, type) => {
    let tempTripleData = { ...tripleData };
    let temp = tempTripleData.evidences[snippetIndex].codes;
    const innerIndex = temp[index].subjectData.findIndex((item) => item.id === id);
    if (type === SUBJECT_LEFT) {
      temp[index].subjectData = temp[index].subjectData.filter((item, i) => i > innerIndex);
    } else {
      temp[index].subjectData = temp[index].subjectData.filter((item, i) => i < innerIndex);
    }
    temp[index].code = createCode(temp, index);
    setTripleData(tempTripleData);
  }

  const removeObject = (id, index, type) => {
    let tempTripleData = { ...tripleData };
    let temp = tempTripleData.evidences[snippetIndex].codes;
    const innerIndex = temp[index].objectData.findIndex((item) => item.id === id);
    if (type === SUBJECT_LEFT) {
      temp[index].objectData = temp[index].objectData.filter((item, i) => i > innerIndex);
    } else {
      temp[index].objectData = temp[index].objectData.filter((item, i) => i < innerIndex);
    }
    temp[index].code = createCode(temp, index);
    setTripleData(tempTripleData);
  }

  const findTypeOfNode = (parentType, functionType) => {
    if (parentType === ROOT) {
      return functionType;
    } else {
      return parentType;
    }
  }

  const onAddToRightOfSubjectType = (element, index, innerIndex) => {
    console.log("element to add to", element);
    if (subRelations.includes(element.selectedValue)) {
      let tempTripleData = { ...tripleData };
      let temp = tempTripleData.evidences[snippetIndex].codes;
      const newData = temp[index].subjectData
      newData.splice(innerIndex + 1, 0, {
        id: uuidv4(),
        selectedValue: "",
        options: element.options,
        type: findTypeOfNode(element.type, SUBJECT_RIGHT),
        entityType: []
      });
      setTripleData(tempTripleData);
    } else {
      const entityType = element.selectedValue.split(":");
      getEntityRight(entityType[0], (result) => {
        let tempTripleData = { ...tripleData };
        let temp = tempTripleData.evidences[snippetIndex].codes;
        const newData = temp[index].subjectData
        newData.splice(innerIndex + 1, 0, {
          id: uuidv4(),
          selectedValue: "",
          options: element.options,
          type: findTypeOfNode(element.type, SUBJECT_RIGHT),
          entityType: result
        });
        setTripleData(tempTripleData);
      })
    }
  };

  const onAddToRightOfObjectType = (element, index, innerIndex) => {
    console.log("element to add to", element);
    if (subRelations.includes(element.selectedValue)) {
      let tempTripleData = { ...tripleData };
      let temp = tempTripleData.evidences[snippetIndex].codes;
      const newData = temp[index].objectData
      newData.splice(innerIndex + 1, 0, {
        id: uuidv4(),
        selectedValue: "",
        options: element.options,
        type: findTypeOfNode(element.type, SUBJECT_RIGHT),
        entityType: []
      });
      setTripleData(tempTripleData);
    } else {
      const entityType = element.selectedValue.split(":");
      getEntityRight(entityType[0], (result) => {
        let tempTripleData = { ...tripleData };
        let temp = tempTripleData.evidences[snippetIndex].codes;
        const newData = temp[index].objectData
        newData.splice(innerIndex + 1, 0, {
          id: uuidv4(),
          selectedValue: "",
          options: element.options,
          type: findTypeOfNode(element.type, SUBJECT_RIGHT),
          entityType: result
        });
        setTripleData(tempTripleData);
      })
    }
  };

  const addFlagAndComment = (comment, index) => {
    let tempTripleData = { ...tripleData };
    let temp = tempTripleData.evidences[snippetIndex].codes;
    temp[index] = { ...temp[index], comment, flagged: true }
    setTripleData(tempTripleData);
  }

  const addContext = (index, data) => {
    if (data.context && data.contextValue) {
      let tempTripleData = { ...tripleData };
      let temp = tempTripleData.evidences[snippetIndex].codes;
      temp[index].contextList.push(data);
      setTripleData(tempTripleData);
    } else {
      setShowAlert(false);
      setAlertType("error");
      setAlertMessage("please add data before adding context");
      setShowAlert(true)
    }
  }

  const removeContext = (index, innerIndex) => {
    let tempTripleData = { ...tripleData };
    let temp = tempTripleData.evidences[snippetIndex].codes;
    temp[index].contextList.splice(innerIndex, 1);
    setTripleData(tempTripleData);
  }

  const commitAndSave = (type) => {
    let temp = { ...tripleData };
    temp.evidences = temp.evidences.map((item) => {
      const validCodes = item.codes.filter((item) => item.code.trim() !== "");
      return {
        ...item,
        codes: validCodes.map((element, index) => {
          let contextObject = {};
          for (let context of element.contextList) {
            contextObject[context.context] = context.contextValue;
          }
          let codeData = {}
          if (element.flagged === true) {
            codeData = {
              id: `${element.evidenceId}_${index + 1}`,
              context: contextObject,
              subject: element.subjectData.map((data) => { return { value: data.selectedValue, type: data.type } }),
              object: element.objectData.map((data) => { return { value: data.selectedValue, type: data.type } }),
              flagged: true,
              comment: element.comment,
              relation: element.relation,
              code: element.code,
            }
          } else {
            codeData = {
              id: `${element.evidenceId}_${index + 1}`,
              context: contextObject,
              subject: element.subjectData.map((data) => { return { value: data.selectedValue, type: data.type } }),
              object: element.objectData.map((data) => { return { value: data.selectedValue, type: data.type } }),
              code: element.code,
              relation: element.relation
            }
          }
          return codeData
        })
      }
    })
    temp.evidences = temp.evidences.filter((item) => item.codes.length > 0);
    if (type === "COMMIT") {
      if (temp.evidences.length !== snippets.evidences.length) {
        setTripleDataToCommit(temp);
        setOpenModalConfirmCommit(true);
      } else {
        commitFunction(temp);
      }
    } else {
      saveTriples(temp, (result) => {
        setAlertType("success");
        setAlertMessage("Saved Triples successfully");
        setShowAlert(true);
      })
    }
  }

  const commitFunction = (temp) => {
    commitTriples(temp, (result) => {
      setOpenModalConfirmCommit(false);
      setAlertType("success");
      setAlertMessage("Committed Triples successfully");
      setShowAlert(true);
      getPaperSnippets(getSnippets);
      setSnippetIndex(0);
    }, (error) => {
      setOpenModalConfirmCommit(false);
      setAlertType("error");
      setAlertMessage(error);
      setShowAlert(true);
    })
  }

  const decodeInComingCode = (result) => {
    if (result?.evidences?.length) {
      let temp = {
        pubid: result.pubid,
        evidences: snippets.evidences?.map((item) => {
          const innerData = result.evidences.filter((element) => element.id === Object.keys(item)[0]);
          if (innerData.length === 0) {
            return {
              id: Object.keys(item)[0],
              codes: [{
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
                }], relation: "", code: "", contextList: [], evidenceId: "", id: `${Object.keys(item)[0]}_1`
              }]
            }
          } else {
            return {
              id: Object.keys(item)[0],
              codes: innerData[0].codes.map((element) => {
                let context = [];
                for (let contextValues of Object.keys(element.context)) {
                  context.push({ context: contextValues, contextValue: element.context[contextValues] })
                }
                return {
                  subjectData: element?.subject?.map((data, index) => {
                    return {
                      id: uuidv4(), // todo: use unique id. eg uuid library
                      selectedValue: data.value,
                      options: [],
                      type: data.type
                    }
                  }),
                  objectData: element?.object?.map((data, index) => {
                    return {
                      id: uuidv4(), // todo: use unique id. eg uuid library
                      selectedValue: data.value,
                      options: [],
                      type: data.type
                    }
                  }),
                  relation: element.relation,
                  code: element.code,
                  contextList: context,
                  evidenceId: "",
                  id: element.id
                }
              })
            }
          }
        })
      }
      setTripleData(temp);
    }
  }

  useEffect(() => {
    getDraft(snippets?.pubid, decodeInComingCode);
  }, [snippets]);

  const handleEdit = (type, id) => {
    let temp = [...editList];
    if (type === "edit") {
      const isPresent = temp.filter(item => item === id).length > 0;
      !isPresent && temp.push(id);
    } else {
      temp = temp.filter(item => item !== id);
    }
    setEditList(temp);
  }

  const handleOpen = (type, id) => {
    let temp = [...openList];
    if (type === "open") {
      const isPresent = temp.filter(item => item === id).length > 0;
      !isPresent && temp.push(id);
    } else {
      temp = temp.filter(item => item !== id);
    }
    console.log(temp);
    setOpenList(temp);
  }

  return (
    <div>
      <a className="link-without-decoration" target="_blank" href={snippets?.url} rel="noreferrer">
        <PageHeader pageTitleText={snippets?.pubid} />
      </a>
      <Section>
        <Box bordered>
          {loading ?
            <Loading />
            :
            <>
              <BodyText dangerouslySetInnerHTML={snippets?.evidences?.length ? { __html: snippets?.evidences[snippetIndex][Object.keys(snippets?.evidences[snippetIndex])[0]] } : { __html: "<div></div>" }} />
              <BodyTextLight>
                {`${snippetIndex + 1}/${snippets?.evidences?.length}`}
              </BodyTextLight>
            </>
          }
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
        {tripleData?.evidences?.length &&
          tripleData?.evidences[snippetIndex]?.codes?.length > 1 ? (
          tripleData?.evidences[snippetIndex]?.codes?.map((item, i) => {
            return (
              <TrippleCollapsed
                ref={item.isNew ? ref : null}
                deleteTriple={deleteTriple}
                duplicateTriple={duplicateTriple}
                index={i}
                key={i}
                chipContent={item.code}
                addToEditList={() => handleEdit("edit", item.id)}
                deleteFromEditList={() => handleEdit("readOnly", item.id)}
                addToOpenList={() => handleOpen("open", item.id)}
                deleteFromOpenList={() => handleOpen("close", item.id)}
                isNew={item.isNew}
                open={openList?.includes(item.id)}
                isFlagged={item.flagged}
              >
                <TripleCollapseContainer>
                  <TripleForm addContext={addContext} removeContext={removeContext} addFlagAndComment={addFlagAndComment} removeObject={removeObject} removeSubject={removeSubject} handleRelationSelect={handleRelationSelect} addSubjectLeft={onAddToLeftOfSubjectType} addSubjectRight={onAddToRightOfSubjectType} addObjectLeft={onAddToLeftOfObjectType} addObjectRight={onAddToRightOfObjectType} onSubjectValueUpdate={onSubjectValueUpdate} onObjectValueUpdate={onObjectValueUpdate} data={item} addNewTriple={addNewTriple} duplicateTriple={duplicateTriple} index={i} relations={relations} tripleDataUpdate={tripleDataUpdate} isEdit={editList.includes(item.id)} deleteFromOpenList={() => handleOpen("close", item.id)}
                    deleteFromEditList={() => handleEdit("readOnly", item.id)} addToEditList={() => handleEdit("edit", item.id)} />
                </TripleCollapseContainer>
              </TrippleCollapsed>
            )
          })) : (
          tripleData?.evidences?.length &&
          tripleData.evidences[snippetIndex].codes.map((item, i) => (
            <TripleForm addContext={addContext} removeContext={removeContext} removeObject={removeObject} addFlagAndComment={addFlagAndComment} removeSubject={removeSubject} handleRelationSelect={handleRelationSelect} addSubjectLeft={onAddToLeftOfSubjectType} addSubjectRight={onAddToRightOfSubjectType} addObjectLeft={onAddToLeftOfObjectType} addObjectRight={onAddToRightOfObjectType} onObjectValueUpdate={onObjectValueUpdate} onSubjectValueUpdate={onSubjectValueUpdate} data={item} key={i} addNewTriple={addNewTriple} duplicateTriple={duplicateTriple} relations={relations} tripleDataUpdate={tripleDataUpdate} isEdit={true} deleteFromOpenList={() => handleOpen("close", item.id)} index={null} />
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
              type={alertType}
              message={alertMessage}
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
      <ConfirmationModal
        openModal={openModalConfirmCommit}
        handleClose={() => setOpenModalConfirmCommit(false)}
        title="Confirm Commit"
        subtitle={"You have some evidences without triples.Are you sure you want to Commit ?"}
        btnText="Commit"
        onClick={() => commitFunction(tripleDataToCommit)}
      />
    </div >
  );
};

export default AddTriple;
