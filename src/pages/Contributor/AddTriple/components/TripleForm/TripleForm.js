import React, { useState } from "react";
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

const TripleForm = (data) => {
  // CONFIRM MODAL
  const [openModalComment, setOpenModalComment] = useState(false);

  const handleClickOpenComment = () => {
    setOpenModalComment(true);
  };

  const handleCloseComment = () => {
    setOpenModalComment(false);
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
    <>
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
        <ChipsContainer>
          <Chip
            content={[{ labelKey: "Species", labelValue: "Human Beings" }]}
            onRemove={() => {}}
          />
          <Chip
            content={[{ labelKey: "Species", labelValue: "Human Beings" }]}
            onRemove={() => {}}
          />
        </ChipsContainer>
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
                  noBg
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
              <Chip
                content={[
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
              />
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
                      onClick={handleClickOpenComment}
                      icon={<AddCommentOutlinedIcon fontSize="small" />}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2} textAlign="right">
                  <Tooltip message="Duplicate" position="top">
                    <IconButton
                      icon={<ContentCopyOutlinedIcon fontSize="small" />}
                      onClick={() => data.push("2")}
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

      {/* Add Comment  */}
      <Modal
        size="sm"
        open={openModalComment}
        close={handleCloseComment}
        title="Add Comment"
        children={<CommentModalContent handleClose={handleCloseComment} />}
      />
    </>
  );
};

export default TripleForm;
