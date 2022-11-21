import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Menu, MenuItem } from "@mui/material";

import { PageHeader, Dropdown, AutoComplete, Button, Chip } from "components";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import {
  Box,
  Section,
  SectionTitle,
  ChipsContainer,
  ActionBox,
} from "assets/styles/main.styles";
import { getCustomerContext, getCustomerContextValues, getCustomerEntities, getCustomerEntityTypes, getQueryDetails, searchTriples } from "config/api.service";
import { ResetTv } from "@mui/icons-material";
import { operations, operator } from "config/constants";

const QueryTriple = () => {
  const [context, setContext] = useState([]);
  const [entityTypes, setEntityTypes] = useState([]);
  const [entityValues, setEntityValues] = useState([]);
  const [contextOptions, setContextOptions] = useState([]);
  const [selectedContexts, setSelectedContexts] = useState([]);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useLocation();

  const preloadQuery = (res) => {
    if (res?.contexts?.length) {
      let tempSelectedContext = []
      for (let tempContext of res.contexts) {
        if (tempContext.type === operator) {
          tempSelectedContext.push(tempContext.value);
        } else if (tempContext.type === "context") {
          const tempValues = tempContext.value.split(":");
          tempSelectedContext.push({
            context: tempValues[0],
            contextValue: tempValues[1]
          })
        }
      }
      setSelectedContexts(tempSelectedContext);
    }
    if (res?.entities?.length) {
      let tempSelectedEntities = []
      for (let tempEntities of res.entities) {
        if (tempEntities.type === operator) {
          tempSelectedEntities.push(tempEntities.value);
        } else if (tempEntities.type === "entity") {
          const tempValues = tempEntities.value.split(":");
          tempSelectedEntities.push({
            entityType: tempValues[0],
            entityValue: tempValues[1]
          })
        }
      }
      setSelectedEntities(tempSelectedEntities);
    }
  }

  useEffect(() => {
    if (state?.id) {
      getQueryDetails(state.id, preloadQuery);
    }
  }, [])

  // Forms
  const [contextState, setContextState] = useState({
    context: "",
    contextValue: ""
  });

  const [entityState, setEntityState] = useState({
    entityType: "",
    entityValue: ""
  });

  const handleContextChange = (event) => {
    setContextState({ context: event.target.value });
    getCustomerContextValues(event.target.value, handleContextValues);
  };

  const handleEntityChange = (event) => {
    setEntityState({ entityType: event.target.value, entityValue: "" });
    getCustomerEntities(event.target.value, handleEntityValues);
  };

  // menu btn

  const [anchorElContext, setAnchorElContext] = React.useState(null);
  const [anchorElEntity, setAnchorElEntity] = React.useState(null);
  const openContext = Boolean(anchorElContext);
  const openEntity = Boolean(anchorElEntity);

  const handleClickContext = (event) => {
    setAnchorElContext(event.currentTarget);
  };

  const handleClickEntity = (event) => {
    setAnchorElEntity(event.currentTarget);
  };
  const handleCloseContext = () => {
    setAnchorElContext(null);
  };

  const handleCloseEntity = () => {
    setAnchorElEntity(null);
  };

  const contextValuesStructuring = (result) => {
    const temp = result?.map((item) => {
      return {
        id: item,
        optionText: item
      }
    })
    setContext(temp);
  }

  const entityTypeValuesStructuring = (result) => {
    const temp = result?.map((item) => {
      return {
        id: item,
        optionText: item
      }
    })
    setEntityTypes(temp);
  }

  useEffect(() => {
    getCustomerContext(contextValuesStructuring);
    getCustomerEntityTypes(entityTypeValuesStructuring);
  }, []);

  const handleContextValues = (result) => {
    const tmp = result.map((item) => {
      return {
        label: item,
        key: item
      }
    });
    setContextOptions(tmp);
  }

  const handleEntityValues = (result) => {
    const tmp = result.map((item) => {
      return {
        label: item,
        key: item
      }
    });
    setEntityValues(tmp);
  }

  const handleContextOperations = (type) => {
    let temp = [...selectedContexts]
    if (type === "ADD") {
      temp.push(contextState);
      setContextState({
        context: "",
        contextValue: ""
      })
    } else if (type === "AND") {
      temp.push("AND");
    } else if (type === "OR") {
      temp.push("OR");
    } else if (type === "NOT") {
      temp.push("NOT");
    }
    setSelectedContexts(temp);
    handleCloseContext();
  }

  const handleEntityOperations = (type) => {
    let temp = [...selectedEntities]
    if (type === "ADD") {
      temp.push(entityState);
      setEntityState({
        entityType: "",
        entityValue: ""
      });
    } else if (type === "AND") {
      temp.push("AND");
    } else if (type === "OR") {
      temp.push("OR");
    } else if (type === "NOT") {
      temp.push("NOT");
    }
    setSelectedEntities(temp);
    handleCloseEntity();
  }

  const deleteContext = (index) => {
    let temp = [...selectedContexts];
    temp.splice(index, 1);
    setSelectedContexts(temp);
  }

  const deleteEntity = (index) => {
    let temp = [...selectedEntities];
    temp.splice(index, 1);
    setSelectedEntities(temp);
  }

  const handleSearchTriples = () => {
    let tempContext = "";
    let tempEntity = "";
    for (let context of selectedContexts) {
      if (typeof (context) === "string") {
        tempContext = `${tempContext},${context}`
      } else {
        tempContext = `${tempContext},${context.context}:${context.contextValue}`
      }
    }
    for (let entity of selectedEntities) {
      if (typeof (entity) === "string") {
        tempEntity = `${tempEntity},${entity}`
      } else {
        tempEntity = `${tempEntity},${entity.entityType}:${entity.entityValue}`
      }
    }
    const data = {
      context: tempContext,
      entity: tempEntity
    }
    searchTriples(data, (result) => navigate(`/search-result`, { state: { context: selectedContexts, entities: selectedEntities, searchData: result } }));
  }

  useEffect(() => {
    if (location?.state?.context?.length) {
      setSelectedContexts(location?.state?.context);
    }
    if (location?.state?.entities?.length) {
      setSelectedEntities(location?.state?.entities);
    }
  }, [location]);

  const reset = () => {
    setSelectedContexts([]);
    setSelectedEntities([]);
    setContextState({ context: "", contextValue: "" });
    setEntityState({ entityType: "", entityValue: "" });
  }

  return (
    <div>
      <PageHeader pageTitleText="Query Triple" />
      <Section>
        <Box>
          <SectionTitle>Please select your context:</SectionTitle>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={3}>
              <Dropdown
                label="Select context"
                onChange={handleContextChange}
                value={contextState.context}
                options={context}
              />
            </Grid>
            <Grid item xs={5}>
              <AutoComplete
                label="Search or enter items"
                placeholder="Enter here..."
                options={contextOptions}
                onChange={(value) => setContextState({ ...contextState, contextValue: value.label ?? value })}
                value={contextState.contextValue}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                btnText="ADD"
                variant="contained"
                aria-controls={openContext ? "context-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openContext ? "true" : undefined}
                onClick={() => handleContextOperations("ADD")}
                disabled={typeof (selectedContexts[selectedContexts.length - 1]) === "object"}

              />
            </Grid>
            <Grid item xs={2}>
              <Button
                btnText="OPERATIONS"
                variant="contained"
                aria-controls={openContext ? "context-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openContext ? "true" : undefined}
                onClick={handleClickContext}
                endIcon={<KeyboardArrowDownOutlinedIcon />}
                disabled={(selectedContexts.length === 0 || typeof (selectedContexts[selectedContexts.length - 1]) === "string")}
              />
              <Menu
                id="context-menu"
                anchorEl={anchorElContext}
                open={openContext}
                onClose={handleCloseContext}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.10))",
                    mt: 0,
                  },
                }}
              >
                <MenuItem onClick={() => handleContextOperations("AND")}>AND</MenuItem>
                <MenuItem onClick={() => handleContextOperations("OR")}>OR</MenuItem>
                <MenuItem onClick={() => handleContextOperations("NOT")}>NOT</MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <ChipsContainer >
            {selectedContexts.map((item, i) => {
              return (
                <>
                  {typeof (item) === "string" ?
                    <Chip
                      isSingleString={true}
                      content={item}
                      onDelete={() => { deleteContext(i) }}
                    />
                    :
                    <Chip
                      content={[{ labelKey: item.context, labelValue: item.contextValue }]}
                      onDelete={() => { deleteContext(i) }}
                    />
                  }
                </>
              )
            })
            }
          </ChipsContainer>
        </Box>
      </Section>
      <Section>
        <Box>
          <SectionTitle>Please select your Entities:</SectionTitle>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={3}>
              <Dropdown
                label="Select entity"
                onChange={handleEntityChange}
                value={entityState.entityType}
                options={entityTypes}
              />
            </Grid>
            <Grid item xs={5}>
              <AutoComplete
                label="Search or enter entities"
                placeholder="Enter here..."
                options={entityValues}
                onChange={(value) => setEntityState({ ...entityState, entityValue: value?.label ?? value })}
                value={entityState.entityValue}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                btnText="ADD"
                variant="contained"
                aria-controls={openEntity ? "context-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openEntity ? "true" : undefined}
                onClick={() => handleEntityOperations("ADD")}
                disabled={typeof (selectedEntities[selectedEntities.length - 1]) === "object"}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                btnText="OPERATIONS"
                variant="contained"
                aria-controls={openEntity ? "context-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openEntity ? "true" : undefined}
                onClick={handleClickEntity}
                endIcon={<KeyboardArrowDownOutlinedIcon />}
                disabled={(selectedEntities.length === 0 || typeof (selectedEntities[selectedEntities.length - 1]) === "string")}
              />
              <Menu
                id="context-menu"
                anchorEl={anchorElEntity}
                open={openEntity}
                onClose={handleCloseEntity}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.10))",
                    mt: 0,
                  },
                }}
              >
                <MenuItem onClick={() => handleEntityOperations("AND")}>AND</MenuItem>
                <MenuItem onClick={() => handleEntityOperations("OR")}>OR</MenuItem>
                <MenuItem onClick={() => handleEntityOperations("NOT")}>NOT</MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <ChipsContainer>
            {selectedEntities.map((item, i) => {
              return (
                <>
                  {typeof (item) === "string" ?
                    <Chip
                      isSingleString={true}
                      content={item}
                      onDelete={() => { deleteEntity(i) }}
                    />
                    :
                    <Chip
                      content={[{ labelKey: item.entityType, labelValue: item.entityValue }]}
                      onDelete={() => { deleteEntity(i) }}
                    />
                  }
                </>
              )
            })
            }
          </ChipsContainer>
        </Box>
      </Section>
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
                  btnText="Reset"
                  variant="outlined"
                  onClick={() => reset()}
                />
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Button
                  disabled={(selectedEntities.length === 0) || (typeof (selectedEntities[selectedEntities.length - 1]) === "string") || (typeof (selectedContexts[selectedContexts.length - 1]) === "string")}
                  btnText="Search"
                  variant="contained"
                  onClick={() => {
                    handleSearchTriples();
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ActionBox>
    </div >
  );
};

export default QueryTriple;
