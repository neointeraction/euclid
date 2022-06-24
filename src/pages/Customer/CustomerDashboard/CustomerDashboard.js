import React from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import { PageHeader, Card, Button } from "components";
import SearchHistoryTable from "../components/SearchHistoryTable";
import PurchaseHistoryTable from "../components/PurchaseHistoryTable";

import {
  Section,
  Box,
  SectionTitle,
  ViewAllBtn,
} from "assets/styles/main.styles";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        isHomePage
        user="Rob"
        btnText="Add Triple"
        onClick={() => navigate("/add-triple")}
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
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={6}>
            <Box>
              <SectionTitle>Latest Search and History</SectionTitle>
              <SearchHistoryTable hideSearch hideFilter />
              <ViewAllBtn>
                <Button
                  btnText="See All"
                  variant="text"
                  onClick={() => navigate("/triple-history")}
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
                  onClick={() => navigate("/triple-history")}
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
