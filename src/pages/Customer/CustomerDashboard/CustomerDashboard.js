import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import {
  PageHeader,
  Card,
  Button,
  IconButton,
  Tooltip,
  ChartFilters,
} from "components";
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
  SectionFlex,
} from "assets/styles/main.styles";
import { getCustomerDashboardDetails, getLastPurchaseDetails, getLastSearchDetails } from "config/api.service";

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
  const [dataCounts, setDataCounts] = useState({});

  useEffect(() => {
    getCustomerDashboardDetails((result) => { setDataCounts(result) });
  }, []);

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
              <SectionFlex>
                <SectionTitle>Real time Data</SectionTitle>
                <ChartFilters averageText={"120 Triples coded"} />
              </SectionFlex>
              <BarGraphChart data={dataBar} layout="vertical" />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <SectionFlex>
                <SectionTitle>Overview of Triples Quered</SectionTitle>
                <ChartFilters
                  byDuration
                  valueDuration={"By days"}
                  averageText={"12 Evidence"}
                  isDown
                />
              </SectionFlex>
              <BarGraphChart data={dataBar} />
            </Box>
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card count={dataCounts.n_evidence_downloaded} title="Evidence Downloaded" color="purple" />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={dataCounts.n_triples_downloaded}
              title="Triples Downloaded"
              color="green"
              onClick={() => { }}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={dataCounts.amount_paid}
              title="Amount Paid"
              color="red"
              onClick={() => { }}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={dataCounts.n_triples_in_cart}
              title="Triples in Cart"
              color="blue"
              onClick={() => { }}
            />
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={6}>
            <Box>
              <SectionTitle>Latest Search and History</SectionTitle>
              <SearchHistoryTable isCompleteList={false} hideSearch hideFilter />
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
              <PurchaseHistoryTable isCompleteList={false} hideSearch hideFilter />
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
