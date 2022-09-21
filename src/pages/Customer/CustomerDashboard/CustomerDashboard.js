import React, { useContext, useEffect, useState } from "react";
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
import { getCustomerDashboardDetails, getCustomerHistogram, getCustomerRealTimeGraph } from "config/api.service";
import { UserContext } from "layout/MainLayout/MainLayout";

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
  const [graphFilter, setGraphFilter] = useState({ by: "days", last: "10" });
  const [graphData, setGraphData] = useState([]);
  const [realTimeGraphData, setRealTimeGraphData] = useState([]);
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    getCustomerDashboardDetails((result) => { setDataCounts(result) });
  }, []);

  const handleDurationChange = (e) => {
    setGraphFilter({ ...graphFilter, by: e.target.value });
  }

  useEffect(() => {
    getCustomerHistogram(graphFilter, (result) => { setGraphData(result) });
  }, [graphFilter])

  useEffect(() => {
    getCustomerRealTimeGraph((result) => { setRealTimeGraphData(result) });
  }, [])

  return (
    <div>
      <PageHeader
        isHomePage
        user={userDetails?.nickname}
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
              <BarGraphChart data={realTimeGraphData} layout="vertical" />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <SectionFlex>
                <SectionTitle>Overview of Triples Quered</SectionTitle>
                <ChartFilters
                  handleChangeDuration={handleDurationChange}
                  byDuration
                  valueDuration={graphFilter.by}
                  averageText={graphFilter.last}
                  isDown
                />
              </SectionFlex>
              <BarGraphChart data={graphData} />
            </Box>
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card count={dataCounts.n_evidence_downloaded} title="Evidence Downloaded" color="purple" isNotClickable={true} />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={dataCounts.n_triples_downloaded}
              title="Triples Downloaded"
              color="green"
              isNotClickable={true}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={dataCounts.amount_paid}
              title="Amount Paid"
              color="red"
              isNotClickable={true}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={dataCounts.n_triples_in_cart}
              title="Triples in Cart"
              color="blue"
              isNotClickable={true}
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
