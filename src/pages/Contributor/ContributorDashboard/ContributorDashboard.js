import React, { useContext, useEffect, useState } from "react";
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
import { getContributorDashboardDetails, getContributorHistogram, getPoints, getSatisfaction } from "config/api.service";
import { UserContext } from "layout/MainLayout/MainLayout";

const ContributorDashboard = () => {
  const navigate = useNavigate();
  const [satisfaction, setSatisfaction] = useState([{ name: "Overall Satisfaction", value: 0 }])
  const [dashboardCounts, setDashboardCounts] = useState({});
  const [point, setPoint] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [graphFilter, setGraphFilter] = useState({ type: "evidences", by: "days", last: "10" });
  const { userDetails } = useContext(UserContext);

  const handleSatisfaction = (result) => {
    setSatisfaction([{ name: "Overall Satisfaction", value: result }])
  }

  const handleDashboardDetails = (result) => {
    setDashboardCounts(result);
  }

  useEffect(() => {
    getSatisfaction(handleSatisfaction);
    getContributorDashboardDetails(handleDashboardDetails);
    getPoints((result) => { setPoint(result) });
  }, []);

  useEffect(() => {
    getContributorHistogram(graphFilter, (result) => { setGraphData(result) });
  }, [graphFilter])

  const handleDurtionChange = (e) => {
    setGraphFilter({ ...graphFilter, by: e.target.value });
  }

  const handleTypeChange = (e) => {
    setGraphFilter({ ...graphFilter, type: e.target.value });
  }

  return (
    <div>
      <PageHeader
        isHomePage
        user={userDetails.nickname}
        btnText="Add Triple"
        onClick={() => navigate("/add-triple")}
      />
      <PointBanner
        points={point}
        user=""
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
                  handleChangeDuration={handleDurtionChange}
                  handleChangeType={handleTypeChange}
                  valueType={graphFilter.type}
                  valueDuration={graphFilter.by}
                  averageText={graphData.length}
                />
              </SectionFlex>
              <BarGraphChart data={graphData} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <SectionTitle>Overall Review</SectionTitle>
              <RadialChart data={satisfaction} circleSize={300} />
            </Box>
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card count={dashboardCounts.n_evidence ?? 0} title="Total No. of Evidence" color="purple" />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={dashboardCounts.n_evidence_validated ?? 0}
              title="Total No. of Triples Validated"
              color="green"
              onClick={() =>
                navigate("/triple-history", {
                  state: {
                    filter: "valid",
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={dashboardCounts.n_triples_reverted ?? 0}
              title="Total No. of Triples Reverted"
              color="red"
              onClick={() =>
                navigate("/triple-history", {
                  state: {
                    filter: "reverted",
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={dashboardCounts.n_triples_commited ?? 0}
              title="Total No. of Triples Committed"
              color="blue"
              onClick={() =>
                navigate("/triple-history", {
                  state: {
                    filter: "committed",
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
          <TripleHistoryTable hideSearch hideFilter={true} />
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
