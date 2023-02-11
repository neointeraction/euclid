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
  Alert,
} from "components";

import CommentModalContent from "../CommentModalContent";

import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddIcon from "@mui/icons-material/Add";
import NextIcon from "../../../../../assets/images/icons/subject-type-next.svg";
import BackIcon from "../../../../../assets/images/icons/subject-type-back.svg";

import {
  Box,
  TypesBlock,
  MultiFormContainer,
  InfoWithActions,
  ChipsContainer,
  AlertWrapper,
} from "assets/styles/main.styles";
import { UserContext } from "layout/MainLayout/MainLayout";
import {
  getContext,
  getContextValues,
  getEntityWithOutType,
} from "config/api.service";
import {
  INFINITE_SCROLL,
  OBJECT,
  RELATION,
  ROOT,
  SUBJECT,
  SUBJECT_LEFT,
  subRelations,
} from "config/constants";
import { v4 as uuidv4 } from "uuid";

const TripleForm = ({
  index,
  relations,
  data,
  onSubjectValueUpdate,
  onObjectValueUpdate,
  addSubjectLeft,
  addObjectLeft,
  addSubjectRight,
  addObjectRight,
  handleRelationSelect,
  removeObject,
  removeSubject,
  addFlagAndComment,
  addContext,
  removeContext,
  setEditList,
  deleteFromOpenList,
}) => {
  // CONFIRM MODAL
  const [openModalComment, setOpenModalComment] = useState(false);
  const { userDetails } = useContext(UserContext);
  const [contextValues, setContextValues] = useState([]);
  const [contextOptions, setContextOptions] = useState([]);
  const [structuredRelations, setStructuredRelation] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [pagination, setPagination] = useState({
    page_num: 0,
    page_size: 10,
    prefix: "",
  });
  const [contextOptionPagination, setContextOptionPagination] = useState({
    page_num: 0,
    page_size: 10,
    prefix: "",
  });
  const [option, setOption] = useState([]);
  const [inFocusIndex, setInFocusIndex] = useState(0);
  const [inFocusType, setInFocusType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isEdit, setIsEdit] = useState(true);

  const [state, setState] = useState({
    context: "",
    contextValue: "",
  });

  const handleClickOpenComment = () => {
    setOpenModalComment(true);
  };

  const handleCloseComment = () => {
    setOpenModalComment(false);
  };

  // Forms

  const handleChange = (event) => {
    setState({ context: event.target.value });
    getContextValues(
      event.target.value,
      contextOptionPagination,
      handleContextValues
    );
  };

  const infiniteScrollFunction = (e) => {
    setPagination({ ...pagination, page_num: pagination.page_num + 1 });
  };

  const infiniteScrollFunctionForContext = (e) => {
    setContextOptionPagination({
      ...contextOptionPagination,
      page_num: contextOptionPagination.page_num + 1,
    });
  };

  const searchFunctionForContext = (value) => {
    setContextOptionPagination({
      ...contextOptionPagination,
      page_num: 0,
      prefix: value,
    });
  };

  const searchFunction = (value) => {
    setPagination({ ...pagination, page_num: 0, prefix: value });
  };

  const mainEntityCallBackOnPagination = (result) => {
    setCurrentOptions(result);
  };

  useEffect(() => {
    getEntityWithOutType({ ...pagination }, mainEntityCallBackOnPagination);
  }, [pagination]);

  useEffect(() => {
    getContextValues(
      state.context,
      contextOptionPagination,
      handleContextValues
    );
  }, [contextOptionPagination]);

  const handleSubjectOption = (result) => {
    const tmp = currentOptions.map((item) => {
      return {
        label: item,
        key: uuidv4(),
      };
    });
    if (pagination.page_num > 0) {
      setOption([...option, ...tmp]);
    } else {
      setOption(tmp);
    }
  };

  useEffect(() => {
    if (currentOptions?.length) {
      handleSubjectOption(currentOptions);
    }
  }, [currentOptions]);

  const invalidAddition = (element, validFunction) => {
    if (element?.value.trim()?.length < 0) {
      setAlertMessage("please select a value before you add next element");
      setShowAlert(true);
    } else {
      validFunction();
    }
  };

  const onAddToLeftOfSubjectType = (element, innerIndex) => {
    invalidAddition(element, () => {
      addSubjectLeft(element, index, innerIndex);
    });
  };

  const onAddToLeftOfObjectType = (element, innerIndex) => {
    invalidAddition(element, () => {
      addObjectLeft(element, index, innerIndex);
    });
  };

  const onAddToRightOfSubjectType = (element, innerIndex) => {
    invalidAddition(element, () => {
      addSubjectRight(element, index, innerIndex);
    });
  };

  const onAddToRightOfObjectType = (element, innerIndex) => {
    invalidAddition(element, () => {
      addObjectRight(element, index, innerIndex);
    });
  };

  const onRemoveFromMultipleSubjectType = (i, type) => {
    removeSubject(i, type);
  };

  const onRemoveFromMultipleObjectType = (i, type) => {
    removeObject(i, type);
  };

  const contextValuesStructuring = (result) => {
    const temp = result?.map((item) => {
      return {
        id: item,
        optionText: item,
      };
    });
    setContextValues(temp);
  };

  const handleContextValues = (result) => {
    const tmp = result.map((item) => {
      return {
        label: item,
        key: uuidv4(),
      };
    });
    if (contextOptionPagination.page_num > 0) {
      setContextOptions([...contextOptions, ...tmp]);
    } else {
      setContextOptions(tmp);
    }
  };

  const addComments = (value) => {
    addFlagAndComment(value, index);
  };

  useEffect(() => {
    if (userDetails) {
      getContext(contextValuesStructuring);
    }
  }, [userDetails]);

  const handleContextAdd = () => {
    addContext(state);
    setState({
      context: "",
      contextValue: "",
    });
  };

  const handleContextOption = (value) => {
    if (typeof value === "object") {
      setState({ ...state, contextValue: value.label });
    } else {
      setState({ ...state, contextValue: value });
    }
  };

  const deleteAddedContext = (item) => {
    removeContext(item);
  };

  useEffect(() => {
    if (relations?.length) {
      setStructuredRelation(
        relations.map((item) => {
          return {
            label: item,
          };
        })
      );
    }
  }, [relations]);

  const handleRelation = (value) => {
    handleRelationSelect(value?.label, index);
  };

  const subjectValueUpdate = (value, innerIndex) => {
    onSubjectValueUpdate(value, index, innerIndex);
  };

  const objectValueUpdate = (value, innerIndex) => {
    onObjectValueUpdate(value, index, innerIndex);
  };

  const dataNormalization = (item) => {
    if (item) {
      if (subRelations.includes(item)) {
        return item;
      } else {
        let [first, ...rest] = item?.split(":");
        return `${first}: ${rest.join(":").replace(/'/g, "")}`;
      }
    } else {
      return "";
    }
  };

  return (
    <>
      <Box>
        {isEdit ? (
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
                value={state.contextValue}
                options={contextOptions ?? []}
                onChange={handleContextOption}
                type={INFINITE_SCROLL}
                onScrollFunction={infiniteScrollFunctionForContext}
                searchFunction={(value) => {
                  searchFunctionForContext(value);
                  handleContextOption(value);
                }}
                valueUpdate={handleContextOption}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleContextAdd();
                  }
                }}
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
        ) : null}
        <ChipsContainer>
          {!isEdit ? <h3>Context: </h3> : null}
          {data && Object.keys(data?.context).length > 0
            ? Object.keys(data?.context).map((item, i) => {
                return (
                  <Chip
                    content={[
                      { labelKey: item, labelValue: data.context[item] },
                    ]}
                    onDelete={() => {
                      deleteAddedContext(item);
                    }}
                  />
                );
              })
            : null}
        </ChipsContainer>
        {isEdit ? (
          <TypesBlock>
            <MultiFormContainer onClick={() => setInFocusType(SUBJECT)}>
              {data?.subject?.map((subjectType, index) => {
                return (
                  <React.Fragment key={subjectType.id}>
                    <ExtendableSubjectTypeForm
                      isRoot={subjectType.type === ROOT}
                      data={dataNormalization(subjectType.value)}
                      index={index}
                      valueUpdate={subjectValueUpdate}
                      setInFocusIndex={setInFocusIndex}
                      infiniteScrollFunction={infiniteScrollFunction}
                      searchFunction={searchFunction}
                      label={"Subject Relation"}
                      onAddToLeft={() =>
                        onAddToLeftOfSubjectType(subjectType, index)
                      }
                      onAddToRight={() =>
                        onAddToRightOfSubjectType(subjectType, index)
                      }
                      onChange={(_e, value) =>
                        console.log("selected value === ", {
                          value,
                          selectedValue: value,
                        })
                      }
                      options={option}
                      type={subjectType.type}
                      onRemove={
                        data.subject.length > 1
                          ? () => {
                              onRemoveFromMultipleSubjectType(
                                index,
                                subjectType.type
                              );
                            }
                          : undefined
                      }
                    />
                  </React.Fragment>
                );
              })}
            </MultiFormContainer>
            <MultiFormContainer>
              <React.Fragment>
                <ExtendableSubjectTypeForm
                  data={data?.relation ? data?.relation : ""}
                  setInFocusIndex={setInFocusIndex}
                  label={index === 0 ? "Relationship type" : ""}
                  noBg
                  onChange={handleRelation}
                  relations={structuredRelations}
                  type={RELATION}
                />
              </React.Fragment>
            </MultiFormContainer>
            <MultiFormContainer onClick={() => setInFocusType(OBJECT)}>
              {data?.object?.map((objectType, index) => (
                <React.Fragment key={objectType.value}>
                  <ExtendableSubjectTypeForm
                    isRoot={objectType.type === ROOT}
                    data={dataNormalization(objectType.value)}
                    valueUpdate={objectValueUpdate}
                    setInFocusIndex={setInFocusIndex}
                    index={index}
                    infiniteScrollFunction={infiniteScrollFunction}
                    searchFunction={searchFunction}
                    label={"Object Relation"}
                    onAddToLeft={() =>
                      onAddToLeftOfObjectType(objectType, index)
                    }
                    onAddToRight={() =>
                      onAddToRightOfObjectType(objectType, index)
                    }
                    onChange={(_e, value) =>
                      console.log("selected value === ", {
                        value,
                        selectedValue: value,
                      })
                    }
                    options={option}
                    type={objectType.type}
                    onRemove={
                      data.object.length > 1
                        ? () => {
                            onRemoveFromMultipleObjectType(
                              index,
                              objectType.type
                            );
                          }
                        : undefined
                    }
                  />
                </React.Fragment>
              ))}
            </MultiFormContainer>
          </TypesBlock>
        ) : null}
        <InfoWithActions>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={9}>
              {data?.code.trim() !== "" ? (
                <ChipsContainer>
                  {!isEdit ? <h3>Code:</h3> : null}
                  <Chip isSingleString={true} content={data?.code} />
                </ChipsContainer>
              ) : (
                <>
                  <Chip isSingleString={true} content={data?.code} />
                </>
              )}
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
        children={
          <CommentModalContent
            onChange={addComments}
            handleClose={handleCloseComment}
          />
        }
      />
      {showAlert && (
        <AlertWrapper>
          <Alert
            type="error"
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        </AlertWrapper>
      )}
    </>
  );
};

export default TripleForm;
