import React from "react";

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

const ReviewerDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader isHomePage user="Rob" />
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card
              count={12}
              title="Invalid Evidences"
              color="purple"
              onClick={() => navigate("/evidences")}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={16}
              title="Triples Validated"
              color="green"
              onClick={() =>
                navigate("/recent-activity", {
                  state: {
                    filter: "Approved",
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={2}
              title="Triples Reverted"
              color="red"
              onClick={() => navigate("/triple-view")}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={32}
              title="Triples Flagged"
              color="blue"
              onClick={() => navigate("/triple-view")}
            />
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Box>
          <SectionTitle>Recent Activities</SectionTitle>
          <TripleHistoryTable hideSearch />
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
