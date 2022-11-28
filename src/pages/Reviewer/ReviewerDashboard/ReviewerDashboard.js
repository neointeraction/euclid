import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import { PageHeader, Card, Button } from "components";
import TripleHistoryTable from "../components/RecentActivityTable";

import {
  Section,
  Box,
  SectionTitle,
  ViewAllBtn,
} from "assets/styles/main.styles";
import { getRecentHistory, getTripleStatuses } from "config/api.service";
import { UserContext } from "layout/MainLayout/MainLayout";

const ReviewerDashboard = () => {
  const navigate = useNavigate();
  const { userDetails } = useContext(UserContext);

  const [summaryCounts, setSummaryCounts] = useState({});
  const [recentHistory, setRecentHistory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all")

  const callBackStatusCount = (result) => {
    setSummaryCounts(result);
  }

  const recentHistoryCallBack = (result) => {
    setRecentHistory(result);
  }

  useEffect(() => {
    getTripleStatuses(callBackStatusCount);
    getRecentHistory(recentHistoryCallBack);
  }, []);

  return (
    <div>
      <PageHeader isHomePage user={userDetails?.nickname} />
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card
              isNotClickable={true}
              count={summaryCounts?.invalid_evidence ?? 0}
              title="Invalid Evidences"
              color="blue"
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              isNotClickable={true}
              count={summaryCounts?.triples_validated ?? 0}
              title="Triples Validated"
              color="green"
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              isNotClickable={true}
              count={summaryCounts?.triples_reverted ?? 0}
              title="Triples Reverted"
              color="red"
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              isNotClickable={true}
              count={summaryCounts?.triples_flagged ?? 0}
              title="Triples Flagged"
              color="orange"
            />
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Box>
          <SectionTitle>Recent Activities</SectionTitle>
          <TripleHistoryTable hideSearch dataList={recentHistory} setSelectedFilter={setSelectedFilter} />
          <ViewAllBtn>
            <Button
              btnText="See All"
              variant="text"
              onClick={() => navigate("/recent-activity")}
            />
          </ViewAllBtn>
        </Box>
      </Section>
    </div>
  );
};

export default ReviewerDashboard;
