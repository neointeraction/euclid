import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import { PageHeader, Card, ChartFilters } from "components";

import { BarGraphChart } from "components/Charts";

import {
  Section,
  Box,
  SectionTitle,
  SectionFlex,
} from "assets/styles/main.styles";

import FlaggedTable from "../components/FlaggedTable";

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

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader isHomePage user="Rob" />
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card
              count={16}
              title="No. of Users"
              color="green"
              onClick={() => navigate("/users")}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={"12"}
              title="No. of Customers"
              color="red"
              onClick={() => navigate("/customers")}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={32}
              title="Evidence Committed"
              color="blue"
              onClick={() => {}}
            />
          </Grid>
          <Grid item xs={3}>
            <Card count={12} title="Evidence Downloaded" color="purple" />
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card count={12} title="Triples Committed" color="purple" />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={16}
              title="Triple Validated"
              color="green"
              onClick={() => {}}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count="22"
              title="Triples Reverted"
              color="red"
              onClick={() => {}}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={52}
              title="Triples Downloaded"
              color="blue"
              onClick={() => {}}
            />
          </Grid>
        </Grid>
      </Section>
      <Section>
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
      </Section>
      <Section>
        <Box>
          <SectionFlex>
            <SectionTitle>Triples Flagged</SectionTitle>
          </SectionFlex>
          <FlaggedTable hideFilter />
        </Box>
      </Section>
    </div>
  );
};

export default AdminDashboard;
