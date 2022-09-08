import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { getCustomerContext, getCustomerContextValues, getCustomerEntities, getCustomerEntityTypes } from "config/api.service";

const QueryTriple = () => {
  const [context, setContext] = useState([]);
  const [entityTypes, setEntityTypes] = useState([]);
  const [entityValues, setEntityValues] = useState([]);
  const [contextOptions, setContextOptions] = useState([]);
  const navigate = useNavigate();
  // Forms
  const [state, setState] = useState({
    context: "",
    contextValue: ""
  });

  const [entityState, setEntityState] = useState({
    entityType: "",
    entityValue: ""
  });

  const handleContextChange = (event) => {
    setState({ context: event.target.value });
    getCustomerContextValues(event.target.value, handleContextValues);

  };

  const handleEntityChange = (event) => {
    setEntityState({ entityType: event.target.value, entityValue: "" });
  };

  // menu btn

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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


  console.log("zrk", contextOptions);
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
                value={state.context}
                options={context}
              />
            </Grid>
            <Grid item xs={5}>
              <AutoComplete
                label="Search or enter items"
                placeholder="Enter here..."
                options={contextOptions}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                btnText="AND"
                variant="contained"
                aria-controls={open ? "context-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownOutlinedIcon />}
              />
              <Menu
                id="context-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.10))",
                    mt: 0,
                  },
                }}
              >
                <MenuItem onClick={handleClose}>AND</MenuItem>
                <MenuItem onClick={handleClose}>OR</MenuItem>
                <MenuItem onClick={handleClose}>NOT</MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <ChipsContainer>
            <Chip
              content={[{ labelKey: "Species", labelValue: "Human Beings" }]}
              onDelete={() => { }}
            />
            <Chip
              content={[{ labelKey: "Species", labelValue: "Human Beings" }]}
              onDelete={() => { }}
            />
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
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                btnText="AND"
                variant="contained"
                aria-controls={open ? "entity-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownOutlinedIcon />}
              />
              <Menu
                id="entity-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>AND</MenuItem>
                <MenuItem onClick={handleClose}>OR</MenuItem>
                <MenuItem onClick={handleClose}>NOT</MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <ChipsContainer>
            <Chip
              content={[{ labelKey: "Species", labelValue: "Human Beings" }]}
              onDelete={() => { }}
            />
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
                  onClick={() => console.log("clicked")}
                />
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Button
                  btnText="Search"
                  variant="contained"
                  onClick={() => navigate("/search-result")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ActionBox>
    </div>
  );
};

export default QueryTriple;
