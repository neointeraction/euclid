import React, { useEffect, useState } from "react";

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

const ReviewerDashboard = () => {
  const navigate = useNavigate();
  const [summaryCounts, setSummaryCounts] = useState({});
  const [recentHistory, setRecentHistory] = useState([]);

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
      <PageHeader isHomePage user="Rob" />
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card
              count={summaryCounts?.invalid_evidence ?? 0}
              title="Invalid Evidences"
              color="blue"
              onClick={() =>
                navigate("/recent-activity", {
                  state: {
                    filter: "Invalid Evidence",
                  },
                })
              }
            // onClick={() => navigate("/evidences")}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={summaryCounts?.triples_validated ?? 0}
              title="Triples Validated"
              color="green"
              onClick={() =>
                navigate("/recent-activity", {
                  state: {
                    filter: "Triples Validated",
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={summaryCounts?.triples_reverted ?? 0}
              title="Triples Reverted"
              color="red"
              onClick={() =>
                navigate("/recent-activity", {
                  state: {
                    filter: "Triples Reverted",
                  },
                })
              }
            // onClick={() => navigate("/triple-view")}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={summaryCounts?.triples_flagged ?? 0}
              title="Triples Flagged"
              color="orange"
              onClick={() =>
                navigate("/recent-activity", {
                  state: {
                    filter: "Triples Flagged",
                  },
                })
              }
            // onClick={() => navigate("/triple-view")}
            />
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Box>
          <SectionTitle>Recent Activities</SectionTitle>
          <TripleHistoryTable hideSearch dataList={recentHistory}/>
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
