import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import { PageHeader, Tooltip, IconButton, Button, Chip } from "components";
import { BarGraphChart } from "components/Charts";

import {
  ActionFlexTitle,
  ActionBox,
  ChipsContainer,
  Section,
  Box,
  SectionTitle,
  TempImage,
} from "assets/styles/main.styles";

import Chart1 from "assets/images/temp/chart1.png";
// import Chart2 from "assets/images/temp/chart2.png";
// import Chart3 from "assets/images/temp/chart3.png";
// import Chart4 from "assets/images/temp/chart4.png";

const dataBar = [
  {
    name: "8 Jun",
    uv: 2780,
    pv: 34,
    amt: 30,
  },
  {
    name: "9 Jun",
    uv: 1890,
    pv: 20,
    amt: 40,
  },
  {
    name: "10 Jun",
    uv: 2390,
    pv: 40,
    amt: 15,
  },
  {
    name: "11 Jun",
    uv: 3490,
    pv: 15,
    amt: 20,
  },
  {
    name: "12 Jun",
    uv: 3490,
    pv: 5,
    amt: 5,
  },
  {
    name: "13 Jun",
    uv: 3490,
    pv: 32,
    amt: 20,
  },
  {
    name: "14 Jun",
    uv: 3490,
    pv: 22,
    amt: 20,
  },
];

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
          <TempImage src={Chart1} alt="Temp1" />
        </Box>
      </Section>
      <Grid container spacing={2} alignItems="baseline">
        <Grid item xs={12}>
          <Section>
            <Box>
              <SectionTitle>
                Top 10 Entities & Its Number of occurance:
              </SectionTitle>
              <BarGraphChart data={dataBar} />
            </Box>
          </Section>
        </Grid>
      </Grid>

      <Section>
        <Box>
          <SectionTitle>Evidence supporting each Triple:</SectionTitle>
          <BarGraphChart data={dataBar} layout="vertical" />
        </Box>
      </Section>
    </div>
  );
};

export default SearchResult;
