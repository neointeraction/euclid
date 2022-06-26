import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import { PageHeader, Dropdown, AutoComplete, Button, Chip } from "components";
import {
  Box,
  Section,
  SectionTitle,
  ChipsContainer,
  ActionBox,
} from "assets/styles/main.styles";

const QueryTriple = () => {
  const navigate = useNavigate();
  // Forms
  const [state, setState] = useState({
    context: "",
  });

  const handleChange = (event) => {
    setState({ context: event.target.value });
  };
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
            <Grid item xs={1}>
              <Button
                btnText="And"
                variant="contained"
                onClick={() => console.log("clicked")}
              />
            </Grid>
          </Grid>
          <ChipsContainer>
            <Chip
              content={[{ labelKey: "Species", labelValue: "Human Beings" }]}
              onDelete={() => {}}
            />
            <Chip
              content={[{ labelKey: "Species", labelValue: "Human Beings" }]}
              onDelete={() => {}}
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
                label="Search or enter entities"
                placeholder="Enter here..."
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                btnText="And"
                variant="contained"
                onClick={() => console.log("clicked")}
              />
            </Grid>
          </Grid>
          <ChipsContainer>
            <Chip
              content={[{ labelKey: "Species", labelValue: "Human Beings" }]}
              onDelete={() => {}}
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
