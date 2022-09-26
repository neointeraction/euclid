import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";

import {
  PageHeader,
  Button,
  Modal,
  PopoverGrid,
  ConfirmationModal,
  TrippleCollapsed,
  Alert,
} from "components";

import EvidenceModalContent from "./components/EvidenceModalContent";

import TripleForm from "./components/TripleForm";
import { v4 as uuidv4 } from 'uuid';


import {
  Section,
  Box,
  BodyText,
  BodyTextLight,
  ActionBox,
  HighlightText,
  TripleCollapseContainer,
  AlertWrapper,
} from "assets/styles/main.styles";
import { ROOT, SUBJECT_LEFT, SUBJECT_RIGHT, subRelations } from "config/constants";
import { getEntityLeft, getEntityRight, getRelations, reviewerCommitTriples } from "config/api.service";

// Dummy popover data

function createData(curie, subcurie, prefferedLabel) {
  return { curie, subcurie, prefferedLabel };
}

const rows = [
  createData("SWISSPROT-GRN_HUMAN", "GSK3 beta", "SWISSPROT-GRN_HUMAN"),
  createData("HGNC:4601", "GSK3 beta", "HGNC:4601"),
  createData("SWISSPROT-GRN_HUMAN 2", "GSK3 beta", "SWISSPROT-GRN_HUMAN 2"),
];

const dummyTripleData = [1];

const EditTriple = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const { state } = useLocation();
  const [data, setData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [relations, setRelations] = useState([]);
  const [editList, setEditList] = useState([]);
  const [openList, setOpenList] = useState([]);

  const relationCallBack = (result) => {
    setRelations(result)
  }

  useEffect(() => {
    getRelations(relationCallBack);
  }, [])


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

  // PopoverGrid
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setData(state);
  }, [state]);

  const addContext = (datas) => {
    if (datas.context && datas.contextValue) {
      let tempTripleData = { ...data };
      let temp = tempTripleData?.codes;
      temp.context[datas.context] = datas.contextValue;
      setData(tempTripleData);
    } else {
      setShowAlert(false);
      setAlertType("error");
      setAlertMessage("please add data before adding context");
      setShowAlert(true)
    }
  }

  const removeContext = (keyName) => {
    let tempTripleData = { ...data };
    let temp = tempTripleData.codes;
    delete temp.context[keyName];
    setData(tempTripleData);
  }

  const createCode = (temp) => {
    let subjectCode = "";
    if (temp.subject?.length) {
      let subject = temp.subject;
      for (let i = 0; i < subject?.length; i++) {
        if (subject[i]) {
          if (subRelations.includes(subject[i])) {
            subjectCode = `${subjectCode} ${subject[i]}`
          } else {
            let temp = subject[i].split(":");
            if (subRelations.includes(subject[i + 1]) || subRelations.includes(subject[i - 1])) {
              subjectCode = `${subjectCode} (${temp[0]}:'${temp[1]}')`
            } else {
              subjectCode = `${subjectCode} ${temp[0]}:'${temp[1]}'`
            }
          }
        }
      }
    }
    let objectCode = "";
    if (temp.object?.length) {
      let object = temp.object;
      for (let i = 0; i < object?.length; i++) {
        if (object[i]) {
          if (subRelations.includes(object[i])) {
            objectCode = `${objectCode} ${object[i]}`
          } else {
            let temp = object[i].split(":");
            if (subRelations.includes(object[i + 1]) || subRelations.includes(object[i - 1])) {
              objectCode = `${objectCode} (${temp[0]}:'${temp[1]}')`
            } else {
              objectCode = `${objectCode} ${temp[0]}:'${temp[1]}'`
            }
          }
        }
      }
    }
    return `${subjectCode ? `(${subjectCode})` : ""} ${temp.relation} ${objectCode ? `(${objectCode})` : ""}`;
  }

  const removeObject = (index, type) => {
    let tempTripleData = { ...data };
    let temp = tempTripleData.codes;
    if (type === SUBJECT_LEFT) {
      temp.object = temp.object.filter((item, i) => i > index);
    } else {
      temp.object = temp.object.filter((item, i) => i < index);
    }
    temp.code = createCode(temp);
    setData(tempTripleData);
  }

  const removeSubject = (index, type) => {
    let tempTripleData = { ...data };
    let temp = tempTripleData.codes;
    if (type === SUBJECT_LEFT) {
      temp.subject = temp.subject.filter((item, i) => i > index);
    } else {
      temp.subject = temp.subject.filter((item, i) => i < index);
    }
    temp.code = createCode(temp);
    setData(tempTripleData);
  }

  const handleRelationSelect = (value, index) => {
    let tempTripleData = { ...data };
    let temp = tempTripleData.codes;
    temp.relation = value;
    temp.code = createCode(temp);
    setData(tempTripleData);
  }

  const findTypeOfNode = (parentType, functionType) => {
    if (parentType === ROOT) {
      return functionType;
    } else {
      return parentType;
    }
  }

  const onAddToLeftOfSubjectType = (element, index, innerIndex) => {
    const entityType = element.split(":");
    let tempTripleData = { ...data };
    let temp = tempTripleData.codes;
    const newData = temp.subject
    if (subRelations.includes(element)) {
      if (innerIndex === 0) {
        console.log("zrk2", index);
        newData.unshift(" ");
      } else {
        newData.splice(innerIndex, 0, "");
      }
      setData(tempTripleData);
    } else {
      getEntityLeft(entityType[0], (result) => {
        if (innerIndex === 0) {
          newData.unshift("");
        } else {
          newData.splice(innerIndex, 0, "");
        }
        setData(tempTripleData);
      })
    }
  };

  const onAddToLeftOfObjectType = (element, index, innerIndex) => {
    console.log("element to add to", element);
    const entityType = element.split(":");
    let tempTripleData = { ...data };
    let temp = tempTripleData.codes;
    const newData = temp.object;
    if (subRelations.includes(element)) {
      if (innerIndex === 0) {
        newData.unshift("");
      } else {
        newData.splice(innerIndex, 0, "");
      }
      setData(tempTripleData);
    } else {
      getEntityLeft(entityType[0], (result) => {
        if (innerIndex === 0) {
          newData.unshift("");
        } else {
          newData.splice(innerIndex, 0, "");
        }
        setData(tempTripleData);
      })
    }
  };


  const onAddToRightOfSubjectType = (element, index, innerIndex) => {
    console.log("element to add to", element);
    if (subRelations.includes(element)) {
      let tempTripleData = { ...data };
      let temp = tempTripleData.codes;
      const newData = temp.subject
      newData.splice(innerIndex + 1, 0, "");
      setData(tempTripleData);
    } else {
      const entityType = element?.split(":");
      getEntityRight(entityType[0], (result) => {
        let tempTripleData = { ...data };
        let temp = tempTripleData.codes;
        const newData = temp.subject
        newData.splice(innerIndex + 1, 0, "");
        setData(tempTripleData);
      })
    }
  };

  const onAddToRightOfObjectType = (element, index, innerIndex) => {
    console.log("element to add to", element);
    if (subRelations.includes(element)) {
      let tempTripleData = { ...data };
      let temp = tempTripleData.codes;
      const newData = temp.object
      newData.splice(innerIndex + 1, 0, "");
      setData(tempTripleData);
    } else {
      const entityType = element?.split(":");
      getEntityRight(entityType[0], (result) => {
        let tempTripleData = { ...data };
        let temp = tempTripleData.codes;
        const newData = temp.object
        newData.splice(innerIndex + 1, 0, "");
        setData(tempTripleData);
      })
    }
  };

  const onSubjectValueUpdate = (value, index, innerIndex) => {
    let tempTripleData = { ...data };
    let temp = tempTripleData.codes;
    temp.subject[innerIndex] = value?.label;
    temp.code = createCode(temp);
    temp.evidenceId = data.id;
    setData(tempTripleData);
  }

  const onObjectValueUpdate = (value, index, innerIndex) => {
    let tempTripleData = { ...data };
    let temp = tempTripleData.codes;
    temp.object[innerIndex] = value.label
    temp.code = createCode(temp);
    temp.evidenceId = data.id;
    setData(tempTripleData);
  }

  const tripleDataUpdate = (subject, object, relationData, code, index) => {
    let tempTripleData = { ...data };
    tempTripleData.codes = { subject: subject, object: object, relation: relationData, code }
    setData(tempTripleData);
  }

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

  const commitData = () => {
    reviewerCommitTriples(data, (result) => {
      setAlertType("success");
      setAlertMessage("Committed Triples successfully");
      setShowAlert(true);
    }, (error) => {
      setAlertType("error");
      setAlertMessage(error);
      setShowAlert(true);
    });
  }

  return (
    <div>
      <PageHeader subText="Modify Triple" pageTitleText={data?.id} />
      <Section>
        <Box bordered>
          <BodyText dangerouslySetInnerHTML={data?.text ? { __html: data.text } : { __html: "<div></div>" }} />

          {/* Popover grid compnent  */}
          <PopoverGrid
            anchorEl={anchorEl}
            handlePopoverClose={handlePopoverClose}
            data={rows}
          />
        </Box>
      </Section>
      <Section>
        <TripleForm addContext={addContext} removeContext={removeContext} removeObject={removeObject} removeSubject={removeSubject} handleRelationSelect={handleRelationSelect} addSubjectLeft={onAddToLeftOfSubjectType} addSubjectRight={onAddToRightOfSubjectType} addObjectLeft={onAddToLeftOfObjectType} addObjectRight={onAddToRightOfObjectType} onSubjectValueUpdate={onSubjectValueUpdate} onObjectValueUpdate={onObjectValueUpdate} data={data.codes} index={0} relations={relations} tripleDataUpdate={tripleDataUpdate} isEdit={editList.includes(data?.codes?.id)} deleteFromOpenList={() => handleOpen("close", data?.codes?.id)}
          deleteFromEditList={() => handleEdit("readOnly", data?.codes?.id)} />
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
                    btnText="Cancel"
                    variant="outlined"
                    onClick={() => navigate(-1)}
                  />
                </Grid>
                <Grid item xs={3} textAlign="right">
                  <Button
                    btnText="Commit"
                    variant="contained"
                    onClick={() => commitData()}
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
        children={<EvidenceModalContent handleClose={handleClose} />}
      />

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
        title="Confirm Commit"
        subtitle={"Are you sure you want to confirm commit ?"}
        btnText="Commit"
      />
    </div>
  );
};

export default EditTriple;
