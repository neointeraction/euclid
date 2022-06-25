import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import { PageHeader, Tooltip, IconButton, Button, Chip } from "components";

import {
  ActionFlexTitle,
  ActionBox,
  ChipsContainer,
  Section,
  Box,
  SectionTitle,
} from "assets/styles/main.styles";

const SearchResult = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        pageTitleText="Buy Triple"
        rightSideContent={
          <ActionFlexTitle>
            <Tooltip message="Add to Cart" position="bottom">
              <IconButton
                secondary
                onClick={() => {}}
                icon={<AddShoppingCartOutlinedIcon fontSize="small" />}
              />
            </Tooltip>
            <Button
              btnText="Buy now for $200"
              variant="contained"
              onClick={() => {}}
            />
          </ActionFlexTitle>
        }
      />
      <ActionBox small>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item xs={12} textAlign="right">
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item xs={11} textAlign="right">
                <ChipsContainer moMargin>
                  <Chip
                    content={[
                      { labelKey: "Species", labelValue: "Human Beings" },
                    ]}
                  />
                  <Chip
                    content={[
                      { labelKey: "Species", labelValue: "Human Beings" },
                    ]}
                  />
                </ChipsContainer>
              </Grid>
              <Grid item xs={1} textAlign="right">
                <Button
                  btnText="Modify"
                  variant="outlined"
                  onClick={() => navigate("/query-triple")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ActionBox>
      <Section>
        <Box>
          <SectionTitle>Types of Entities:</SectionTitle>
        </Box>
      </Section>
    </div>
  );
};

export default SearchResult;
