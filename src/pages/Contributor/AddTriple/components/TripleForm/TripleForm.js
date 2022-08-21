import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import {
  Button,
  Dropdown,
  AutoComplete,
  Modal,
  IconButton,
  ExtendableSubjectTypeForm,
  Tooltip,
  Chip,
} from "components";

import CommentModalContent from "../CommentModalContent";

import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddIcon from "@mui/icons-material/Add";

import {
  Box,
  TypesBlock,
  MultiFormContainer,
  InfoWithActions,
  ChipsContainer,
} from "assets/styles/main.styles";
import { UserContext } from "layout/MainLayout/MainLayout";
import { getContext, getContextValues, getEntityWithOutType } from "config/api.service";
import { RELATION, ROOT, SUBJECT_LEFT, SUBJECT_RIGHT } from "config/constants";
import { v4 as uuidv4 } from 'uuid';


const TripleForm = ({ addNewTriple, duplicateTriple, deleteTriple, index, relations }) => {
  // CONFIRM MODAL
  const [openModalComment, setOpenModalComment] = useState(false);
  const { userDetails } = useContext(UserContext);
  const [addedContext, setAddedContext] = useState([]);
  const [contextValues, setContextValues] = useState([]);
  const [contextOptions, setContextOptions] = useState([]);
  const [structuredRelations, setStructuredRelation] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [pagination, setPagination] = useState({ page_num: 0, page_size: 10, prefix: "" })
  const [option, setOption] = useState([]);
  const [inFocusIndex, setInFocusIndex] = useState(0);
  const [selectedRelation, setSelectedRelation] = useState("");
  const [code, setCode] = useState("");

  const [state, setState] = useState({
    context: "",
    contextValue: ""
  });

  useEffect(() => {
    if (inFocusIndex !== RELATION) {

    }
  }, [inFocusIndex])


  const handleClickOpenComment = () => {
    setOpenModalComment(true);
  };

  const handleCloseComment = () => {
    setOpenModalComment(false);
  };

  // Forms

  const handleChange = (event) => {
    setState({ context: event.target.value });
    getContextValues(event.target.value, handleContextValues)
  };

  const infiniteScrollFunction = (e) => {
    setPagination({ ...pagination, page_num: pagination.page_num + 1 });
  }

  const searchFunction = (value) => {
    setPagination({ ...pagination, page_num: 0, prefix: value });
  }

  const mainEntityCallBackOnPagination = (result) => {
    setCurrentOptions(result);
  }

  useEffect(() => {
    getEntityWithOutType({ ...pagination }, mainEntityCallBackOnPagination);
  }, [pagination])

  const [multipleSubjectTypes, setMultipleSubjectTypes] = useState([
    {
      id: 0, // todo: use unique id. eg uuid library
      selectedValue: "",
      options: [],
      type: ROOT
    },
  ]);

  const [multipleObjectTypes, setMultipleObjectTypes] = useState([
    {
      id: 0, // todo: use unique id. eg uuid library
      selectedValue: "",
      options: [],
      type: ROOT
    },
  ]);

  const handleSubjectOption = (result) => {
    const tmp = currentOptions.map((item) => {
      return {
        label: item,
        key: uuidv4()
      }
    });
    if (pagination.page_num > 0) {
      setOption([...option, ...tmp]);
    } else {
      setOption(tmp);
    }
  }

  useEffect(() => {
    if (currentOptions?.length) {
      handleSubjectOption(currentOptions);
    }
  }, [currentOptions])

  const handleLeftOption = () => {

  }

  const handleRightOption = () => {

  }

  const onSubjectValueUpdate = (value, index) => {
    let temp = [...multipleSubjectTypes];
    temp[index] = { ...temp[index], selectedValue: value.label }
    setMultipleSubjectTypes(temp);
  }

  const onObjectValueUpdate = (value, index) => {
    let temp = [...multipleObjectTypes];
    temp[index] = { ...temp[index], selectedValue: value.label }
    setMultipleObjectTypes(temp);
  }

  const onAddToLeftOfSubjectType = (element, index) => {
    console.log("element to add to", element);
    const newData = [...multipleSubjectTypes];
    if (index === 0) {
      newData.unshift({
        id: uuidv4(),
        selectedValue: "",
        options: element.options,
        type: SUBJECT_LEFT
      });
    } else {
      newData.splice(index - 1, 0, {
        id: uuidv4(),
        selectedValue: "",
        options: element.options,
        type: SUBJECT_LEFT
      });
    }
    setMultipleSubjectTypes(newData);
  };

  const onAddToLeftOfObjectType = (element, index) => {
    console.log("element to add to", element);
    const newData = [...multipleObjectTypes];
    if (index === 0) {
      newData.unshift({
        id: uuidv4(),
        selectedValue: "",
        options: element.options,
        type: SUBJECT_LEFT
      });
    } else {
      newData.splice(index - 1, 0, {
        id: uuidv4(),
        selectedValue: "",
        options: element.options,
        type: SUBJECT_LEFT
      });
    }
    setMultipleObjectTypes(newData);
  };

  const onAddToRightOfSubjectType = (element, index) => {
    console.log("element to add to", element);
    const newData = [...multipleSubjectTypes];
    newData.splice(index + 1, 0, {
      id: uuidv4(),
      selectedValue: "",
      options: element.options,
      type: SUBJECT_RIGHT
    });
    setMultipleSubjectTypes(newData);
  };

  const onAddToRightOfObjectType = (element, index) => {
    console.log("element to add to", element);
    const newData = [...multipleObjectTypes];
    newData.splice(index + 1, 0, {
      id: uuidv4(),
      selectedValue: "",
      options: element.options,
      type: SUBJECT_RIGHT
    });
    setMultipleObjectTypes(newData);
  };

  const onRemoveFromMultipleSubjectType = (elementId) => {
    if (multipleSubjectTypes.length <= 1 || elementId === 0) return;
    const filteredList = multipleSubjectTypes.filter(
      (item) => item.id !== elementId
    );
    setMultipleSubjectTypes(filteredList);
  };

  const onRemoveFromMultipleObjectType = (elementId) => {
    if (multipleObjectTypes.length <= 1) return;
    const filteredList = multipleObjectTypes.filter(
      (item) => item.id !== elementId
    );
    setMultipleObjectTypes(filteredList);
  };

  const contextValuesStructuring = (result) => {
    const temp = result?.map((item) => {
      return {
        id: item,
        optionText: item
      }
    })
    setContextValues(temp);
  }

  const handleContextValues = (result) => {
    setContextOptions(result)
  }


  useEffect(() => {
    if (userDetails) {
      getContext(contextValuesStructuring);
    }
  }, [userDetails]);

  const handleContextAdd = () => {
    setAddedContext(oldData => [...oldData, state])
  }

  const handleContextOption = (value) => {
    setState({ ...state, contextValue: value })
  }

  const deleteAddedContext = (index) => {
    let temp = [...addedContext];
    temp.splice(index, 1);
    setAddedContext(temp);
  }

  useEffect(() => {
    if (relations?.length) {
      setStructuredRelation(relations.map((item) => {
        return {
          label: item
        }
      }))
    }
  }, [relations])

  const handleRelationSelect = (value) => {
    setSelectedRelation(value?.label);
  }

  useEffect(() => {
    let subjectCode = "";
    if (multipleSubjectTypes?.length) {
      for (let subject of multipleSubjectTypes) {
        if (subject.selectedValue) {
          let temp = subject.selectedValue.split(":");
          subjectCode = `${subjectCode} ${temp[0]}:'${temp[1]}'`
        }
      }
    }
    let objectCode = "";
    if (multipleObjectTypes?.length) {
      for (let object of multipleObjectTypes) {
        if (object.selectedValue) {
          let temp = object.selectedValue.split(":");
          objectCode = `${objectCode} ${temp[0]}:'${temp[1]}'`
        }
      }
    }
    if (subjectCode || objectCode || selectedRelation) {
      setCode(`${subjectCode ? `(${subjectCode})` : ""} ${selectedRelation} ${objectCode ? `(${objectCode})` : ""}`);
    }
  }, [selectedRelation, multipleSubjectTypes, multipleObjectTypes]);

  return (
    <>
      <Box>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={3}>
            <Dropdown
              label="Select context"
              onChange={handleChange}
              value={state.context}
              options={contextValues ?? []}
            />
          </Grid>
          <Grid item xs={5}>
            <AutoComplete
              label="Search or enter items"
              placeholder="Enter here..."
              options={contextOptions ?? []}
              onChange={handleContextOption}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              btnText="Add"
              variant="contained"
              onClick={() => handleContextAdd()}
            />
          </Grid>
        </Grid>
        <ChipsContainer>
          {addedContext.map((item, i) => {
            return (
              <Chip
                content={[{ labelKey: item.context, labelValue: item.contextValue }]}
                onDelete={() => { deleteAddedContext(i) }}
              />
            )
          })
          }
        </ChipsContainer>
        <TypesBlock>
          <MultiFormContainer>
            {multipleSubjectTypes.map((subjectType, index) => (
              <React.Fragment key={subjectType.id}>
                <ExtendableSubjectTypeForm
                  index={index}
                  valueUpdate={onSubjectValueUpdate}
                  setInFocusIndex={setInFocusIndex}
                  infiniteScrollFunction={infiniteScrollFunction}
                  searchFunction={searchFunction}
                  label={index === 0 ? "Subject type" : ""}
                  onAddToLeft={() => onAddToLeftOfSubjectType(subjectType, index)}
                  onAddToRight={() => onAddToRightOfSubjectType(subjectType, index)}
                  onChange={(_e, value) =>
                    console.log("selected value === ", {
                      value,
                      selectedValue: value,
                    })
                  }
                  options={option}
                  type={subjectType.type}
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
            <React.Fragment >
              <ExtendableSubjectTypeForm
                setInFocusIndex={setInFocusIndex}
                label={index === 0 ? "Relationship type" : ""}
                noBg
                onChange={handleRelationSelect}
                relations={structuredRelations}
                type={RELATION}
              />
            </React.Fragment>
          </MultiFormContainer>
          <MultiFormContainer>
            {multipleObjectTypes.map((objectType, index) => (
              <React.Fragment key={objectType.id}>
                <ExtendableSubjectTypeForm
                  valueUpdate={onObjectValueUpdate}
                  setInFocusIndex={setInFocusIndex}
                  index={index}
                  infiniteScrollFunction={infiniteScrollFunction}
                  searchFunction={searchFunction}
                  label={index === 0 ? "Object type" : ""}
                  onAddToLeft={() => onAddToLeftOfObjectType(objectType, index)}
                  onAddToRight={() => onAddToRightOfObjectType(objectType, index)}
                  onChange={(_e, value) =>
                    console.log("selected value === ", {
                      value,
                      selectedValue: value,
                    })
                  }
                  options={option}
                  type={objectType.type}
                  onRemove={
                    multipleObjectTypes.length > 1
                      ? () => {
                        onRemoveFromMultipleObjectType(objectType.id);
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
              {code !== "" || undefined ?
                <Chip
                  isSingleString={true}
                  content={code}
                />
                :
                null
              }
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Grid item xs={2} textAlign="right">
                  <Tooltip message="Flag and Comment" position="top">
                    <IconButton
                      onClick={handleClickOpenComment}
                      icon={<AddCommentOutlinedIcon fontSize="small" />}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2} textAlign="right">
                  <Tooltip message="Duplicate" position="top">
                    <IconButton
                      icon={<ContentCopyOutlinedIcon fontSize="small" />}
                      onClick={() => duplicateTriple(index)}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2} textAlign="right">
                  <Tooltip message="Add Triple" position="top">
                    <IconButton
                      icon={<AddIcon fontSize="medium" />}
                      onClick={() => addNewTriple()}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </InfoWithActions>
      </Box>

      {/* Flag and Comment  */}
      <Modal
        size="sm"
        open={openModalComment}
        close={handleCloseComment}
        title="Flag and Comment"
        children={<CommentModalContent handleClose={handleCloseComment} />}
      />
    </>
  );
};

export default TripleForm;
