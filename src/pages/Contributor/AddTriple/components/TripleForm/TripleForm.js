import React, { useContext, useEffect, useRef, useState } from "react";
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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";


import {
  Box,
  TypesBlock,
  MultiFormContainer,
  InfoWithActions,
  ChipsContainer,
  AlertWrapper,
} from "assets/styles/main.styles";
import { UserContext } from "layout/MainLayout/MainLayout";
import { getContext, getContextValues, getEntityWithOutType } from "config/api.service";
import { INFINITE_SCROLL, OBJECT, RELATION, ROOT, SUBJECT } from "config/constants";
import { v4 as uuidv4 } from 'uuid';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import PreviewIcon from '@mui/icons-material/Preview';




const TripleForm = ({ addNewTriple, duplicateTriple, index, relations, data, onSubjectValueUpdate, onObjectValueUpdate, addSubjectLeft, addObjectLeft, addSubjectRight, addObjectRight, handleRelationSelect, removeObject, removeSubject, addFlagAndComment, addContext, removeContext, isEdit, setEditList, deleteFromOpenList, addToEditList, deleteFromEditList }) => {
  // CONFIRM MODAL
  const [openModalComment, setOpenModalComment] = useState(false);
  const { userDetails } = useContext(UserContext);
  const [contextValues, setContextValues] = useState([]);
  const [contextOptions, setContextOptions] = useState([]);
  const [structuredRelations, setStructuredRelation] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [pagination, setPagination] = useState({ page_num: 0, page_size: 10, prefix: "" })
  const [contextOptionPagination, setContextOptionPagination] = useState({ page_num: 0, page_size: 10, prefix: "" });
  const [option, setOption] = useState([]);
  const [inFocusIndex, setInFocusIndex] = useState(0);
  const [inFocusType, setInFocusType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  const [state, setState] = useState({
    context: "",
    contextValue: ""
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
    getContextValues(event.target.value, contextOptionPagination, handleContextValues)
  };

  const infiniteScrollFunction = (e) => {
    setPagination({ ...pagination, page_num: pagination.page_num + 1 });
  }

  const infiniteScrollFunctionForContext = (e) => {
    setContextOptionPagination({ ...contextOptionPagination, page_num: contextOptionPagination.page_num + 1 });
  }

  const searchFunctionForContext = (value) => {
    setContextOptionPagination({ ...contextOptionPagination, page_num: 0, prefix: value });
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

  useEffect(() => {
    getContextValues(state.context, contextOptionPagination, handleContextValues);
  }, [contextOptionPagination])

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

  const invalidAddition = (element, validFunction) => {
    if (!element.selectedValue) {
      setAlertMessage("please select a value before you add next element");
      setShowAlert(true);
    } else {
      validFunction();
    }
  }

  const onAddToLeftOfSubjectType = (element, innerIndex) => {
    invalidAddition(element, () => { addSubjectLeft(element, index ?? 0, innerIndex) });
  };

  const onAddToLeftOfObjectType = (element, innerIndex) => {
    invalidAddition(element, () => { addObjectLeft(element, index ?? 0, innerIndex) });
  };

  const onAddToRightOfSubjectType = (element, innerIndex) => {
    invalidAddition(element, () => { addSubjectRight(element, index ?? 0, innerIndex) });
  };

  const onAddToRightOfObjectType = (element, innerIndex) => {
    invalidAddition(element, () => { addObjectRight(element, index ?? 0, innerIndex) });
  };

  const onRemoveFromMultipleSubjectType = (element) => {
    if (element.type !== ROOT) {
      removeSubject(element.id, index ?? 0, element.type);
    } else {
      setAlertMessage("You can't Delete Root Node")
      setShowAlert(true);
    }
  };

  const onRemoveFromMultipleObjectType = (element) => {
    if (element.type !== ROOT) {
      removeObject(element.id, index ?? 0, element.type);
    } else {
      setAlertMessage("You can't Delete Root Node")
      setShowAlert(true);
    }
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
    const tmp = result.map((item) => {
      return {
        label: item,
        key: uuidv4()
      }
    });
    if (contextOptionPagination.page_num > 0) {
      setContextOptions([...contextOptions, ...tmp]);
    } else {
      setContextOptions(tmp);
    }
  }

  const addComments = (value) => {
    addFlagAndComment(value, index ?? 0);
  }

  useEffect(() => {
    if (userDetails) {
      getContext(contextValuesStructuring);
    }
  }, [userDetails]);

  const handleContextAdd = () => {
    addContext(index ?? 0, state);
  }

  const handleContextOption = (value) => {
    if (typeof (value) === "object") {
      setState({ ...state, contextValue: value.label })
    } else {
      setState({ ...state, contextValue: value })
    }
  }

  const deleteAddedContext = (innerIndex) => {
    removeContext(index ?? 0, innerIndex);
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

  const handleRelation = (value) => {
    handleRelationSelect(value?.label, index ?? 0);
  }

  const subjectValueUpdate = (value, innerIndex) => {
    onSubjectValueUpdate(value, index ?? 0, innerIndex);
  }

  const objectValueUpdate = (value, innerIndex) => {
    onObjectValueUpdate(value, index ?? 0, innerIndex);
  }

  
  return (
    <>
      <Box>
        {isEdit ?
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
                type={INFINITE_SCROLL}
                onScrollFunction={infiniteScrollFunctionForContext}
                searchFunction={(value) => {
                  searchFunctionForContext(value);
                  handleContextOption(value);
                }}
                valueUpdate={handleContextOption}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleContextAdd()
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
          </Grid> : null}
        <ChipsContainer>
          {!isEdit ?
            <h3>Context: </h3>
            :
            null
          }
          {data?.contextList?.map((item, i) => {
            return (
              <Chip
                content={[{ labelKey: item.context, labelValue: item.contextValue }]}
                onDelete={() => { deleteAddedContext(i) }}
              />
            )
          })
          }
        </ChipsContainer>
        {isEdit ?
          <TypesBlock>
            <MultiFormContainer onClick={() => setInFocusType(SUBJECT)}>
              {data?.subjectData?.map((subjectType, index) => (
                <React.Fragment key={subjectType.id}>
                  <ExtendableSubjectTypeForm
                    isRoot={subjectType.type === ROOT}
                    data={subjectType.selectedValue}
                    index={index}
                    valueUpdate={subjectValueUpdate}
                    setInFocusIndex={setInFocusIndex}
                    infiniteScrollFunction={infiniteScrollFunction}
                    searchFunction={searchFunction}
                    label={"Subject Relation"}
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
                      data.subjectData.length > 1
                        ? () => {
                          onRemoveFromMultipleSubjectType(subjectType);
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
                  data={data.relation}
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
              {data?.objectData?.map((objectType, index) => (
                <React.Fragment key={objectType.id}>
                  <ExtendableSubjectTypeForm
                    isRoot={objectType.type === ROOT}
                    data={objectType.selectedValue}
                    valueUpdate={objectValueUpdate}
                    setInFocusIndex={setInFocusIndex}
                    index={index}
                    infiniteScrollFunction={infiniteScrollFunction}
                    searchFunction={searchFunction}
                    label={"Object Relation"}
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
                      data.objectData.length > 1
                        ? () => {
                          onRemoveFromMultipleObjectType(objectType);
                        }
                        : undefined
                    }
                  />
                </React.Fragment>
              ))}
            </MultiFormContainer>
          </TypesBlock> : null}
        <InfoWithActions>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={9}>
              {data?.code?.trim() !== "" ?
                <ChipsContainer>
                  {!isEdit ?
                    <h3>Code:</h3>
                    : null
                  }
                  <Chip
                    isSingleString={true}
                    content={data?.code}
                  />
                  {data.flagged === true ?
                    <Tooltip message={`Flagged Comment : ${data.comment}`} position="top">
                      <IconButton
                        icon={<MarkUnreadChatAltIcon fontSize="small" />}
                      />
                    </Tooltip> : null}
                </ChipsContainer>
                :
                <>
                  <Chip
                    isSingleString={true}
                    content={data?.code}
                  />
                  {data.flagged === true ?
                    <Tooltip message="This triple is Flagged" position="top">
                      <IconButton
                        icon={<MarkUnreadChatAltIcon fontSize="small" />}
                      />
                    </Tooltip> : null}
                </>
              }
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="flex-end"
              >
                {index === null ?
                  null :
                  <>
                    {
                      isEdit ?
                        <Grid item textAlign="right">
                          < Tooltip message="View" position="top">
                            <IconButton
                              icon={<PreviewIcon fontSize="small" />}
                              onClick={() => {
                                deleteFromEditList()
                              }}
                            />
                          </Tooltip>
                        </Grid>
                        :
                        <Grid item textAlign="right">
                          <Tooltip message="Edit" position="top">
                            <IconButton
                              icon={<EditOutlinedIcon fontSize="small" />}
                              onClick={() => {
                                addToEditList();
                              }}
                            />
                          </Tooltip>
                        </Grid>
                    }
                  </>
                }
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
                      onClick={() => {
                        duplicateTriple(index);
                      }}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2} textAlign="right">
                  <Tooltip message="Add Triple" position="top">
                    <IconButton
                      icon={<AddIcon fontSize="medium" />}
                      onClick={() => {
                        addNewTriple();
                      }}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </InfoWithActions >
      </Box >
      {/* Flag and Comment  */}
      < Modal
        size="sm"
        open={openModalComment}
        close={handleCloseComment}
        title="Flag and Comment"
        children={< CommentModalContent onChange={addComments} handleClose={handleCloseComment} />}
      />
      {
        showAlert && (
          <AlertWrapper>
            <Alert
              type="error"
              message={alertMessage}
              onClose={() => setShowAlert(false)}
            />
          </AlertWrapper>
        )
      }
    </>
  );
};

export default TripleForm;
