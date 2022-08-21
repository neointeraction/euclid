import React from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import {
  PageHeader,
  PointBanner,
  Card,
  Button,
  ChartFilters,
} from "components";
import TripleHistoryTable from "../components/TripleHistoryTable";

import {
  Section,
  Box,
  SectionTitle,
  ViewAllBtn,
  SectionFlex,
} from "assets/styles/main.styles";
import { BarGraphChart, RadialChart } from "components/Charts";

const radialData = [{ name: "Overall Satisfaction", value: 85 }];
const dataBar = [
  {
    name: "5 Jun",
    uv: 4000,
    pv: 10,
    amt: 20,
  },
  {
    name: "6 Jun",
    uv: 3000,
    pv: 20,
    amt: 10,
  },
  {
    name: "7 Jun",
    uv: 2000,
    pv: 30,
    amt: 26,
  },
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

const ContributorDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        isHomePage
        user="Rob"
        btnText="Add Triple"
        onClick={() => navigate("/add-triple")}
      />
      <PointBanner
        points={32}
        user="Rob"
        infoText="You’ve been rewarded with Rs. 2000 in your Zeta Gift Card from
            Better world Technologies."
      />
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={8}>
            <Box>
              <SectionFlex>
                <SectionTitle>Performance Overview</SectionTitle>
                <ChartFilters
                  byType
                  byDuration
                  valueType={"Evidences"}
                  valueDuration={"By days"}
                  averageText={"12 Evidences"}
                />
              </SectionFlex>
              <BarGraphChart data={dataBar} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <SectionTitle>Overall Review</SectionTitle>
              <RadialChart data={radialData} circleSize={300} />
            </Box>
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card count={12} title="Total No. of Evidence" color="purple" />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={16}
              title="Total No. of Triples Validated"
              color="green"
              onClick={() =>
                navigate("/triple-history", {
                  state: {
                    filter: "Approved",
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={1}
              title="Total No. of Triples Reverted"
              color="red"
              onClick={() =>
                navigate("/triple-history", {
                  state: {
                    filter: "Reverted",
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={32}
              title="Total No. of Triples Committed"
              color="blue"
              onClick={() =>
                navigate("/triple-history", {
                  state: {
                    filter: "Committed",
                  },
                })
              }
            />
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Box>
          <SectionTitle>Triple History</SectionTitle>
          <TripleHistoryTable hideSearch hideFilter={true}/>
          <ViewAllBtn>
            <Button
              btnText="See All"
              variant="text"
              onClick={() => navigate("/triple-history")}
            />
          </ViewAllBtn>
        </Box>
      </Section>
    </div>
  );
};

export default ContributorDashboard;
