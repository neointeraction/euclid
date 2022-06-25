import React from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import { PageHeader, Card, Button, IconButton, Tooltip } from "components";
import SearchHistoryTable from "../components/SearchHistoryTable";
import PurchaseHistoryTable from "../components/PurchaseHistoryTable";
import { BarGraphChart } from "components/Charts";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import {
  Section,
  Box,
  SectionTitle,
  ViewAllBtn,
  ActionFlexTitle,
} from "assets/styles/main.styles";

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

const CustomerDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        isHomePage
        user="Rob"
        rightSideContent={
          <ActionFlexTitle>
            <Tooltip message="Go to Cart" position="bottom">
              <IconButton
                secondary
                onClick={() => navigate("/cart")}
                icon={<ShoppingCartOutlinedIcon fontSize="small" />}
              />
            </Tooltip>

            <Button
              btnText="Query Triple"
              variant="contained"
              onClick={() => navigate("/query-triple")}
            />
          </ActionFlexTitle>
        }
      />
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={6}>
            <Box>
              <SectionTitle>Real time Data</SectionTitle>
              <BarGraphChart data={dataBar} layout="vertical" />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <SectionTitle>Overview of Triples Quered</SectionTitle>
              <BarGraphChart data={dataBar} />
            </Box>
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card count={12} title="Evidence Downloaded" color="purple" />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={16}
              title="Triples Downloaded"
              color="green"
              onClick={() => {}}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={"$200"}
              title="Amount Paid"
              color="red"
              onClick={() => {}}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={32}
              title="Triples in Cart"
              color="blue"
              onClick={() => {}}
            />
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={6}>
            <Box>
              <SectionTitle>Latest Search and History</SectionTitle>
              <SearchHistoryTable hideSearch hideFilter />
              <ViewAllBtn>
                <Button
                  btnText="See All"
                  variant="text"
                  onClick={() => navigate("/search-history")}
                />
              </ViewAllBtn>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <SectionTitle>Previous Purchases</SectionTitle>
              <PurchaseHistoryTable hideSearch hideFilter />
              <ViewAllBtn>
                <Button
                  btnText="See All"
                  variant="text"
                  onClick={() => navigate("/previous-purchases")}
                />
              </ViewAllBtn>
            </Box>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
};

export default CustomerDashboard;
