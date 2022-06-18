import React from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import { PageHeader, PointBanner, Card, Button } from "components";
import TripleHistoryTable from "../components/TripleHistoryTable";

import {
  Section,
  Box,
  SectionTitle,
  ViewAllBtn,
} from "assets/styles/main.styles";

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
          <TripleHistoryTable hideSearch />
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
