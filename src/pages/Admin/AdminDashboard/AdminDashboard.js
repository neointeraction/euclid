import React, { useContext, useEffect, useReducer, useState } from "react";
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
import { getAdminHistogram, getDashboardDetails } from "config/api.service";
import { UserContext } from "layout/MainLayout/MainLayout";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [generalCounts, setGeneralCounts] = useState({});
  const [graphFilter, setGraphFilter] = useState({ type: "evidences", by: "days", last: "10" });
  const [graphData, setGraphData] = useState([]);
  const { userDetails } = useContext(UserContext)

  const handleGeneralCounts = (result) => {
    setGeneralCounts(result);
  }

  useEffect(() => {
    getDashboardDetails(handleGeneralCounts);
  }, [])

  useEffect(() => {
    getAdminHistogram(graphFilter, (result) => { setGraphData(result) });
  }, [graphFilter])

  const handleDurtionChange = (e) => {
    setGraphFilter({ ...graphFilter, by: e.target.value });
  }

  const handleTypeChange = (e) => {
    setGraphFilter({ ...graphFilter, type: e.target.value });
  }

  return (
    <div>
      <PageHeader isHomePage user={userDetails?.nickname} />
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card
              hasIcon={true}
              selectedIcon={<SupervisedUserCircleIcon sx={{ fontSize: 60 }} color={"info"} />}
              count={generalCounts?.n_users ?? 0}
              title="No. of Users"
              color="green"
              onClick={() => navigate("/users")}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              hasIcon={true}
              selectedIcon={<AccountCircleIcon sx={{ fontSize: 60 }} color={"info"} />}
              count={generalCounts?.n_customers ?? 0}
              title="No. of Customers"
              color="red"
              onClick={() => navigate("/customers")}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={generalCounts["Evidence Committed"] ?? 0}
              title="Evidence Committed"
              color="blue"
              isNotClickable={true}
            />
          </Grid>
          <Grid item xs={3}>
            <Card count={generalCounts["Evidence Downloaded"] ?? 0} title="Evidence Downloaded" color="purple" isNotClickable={true}/>
          </Grid>
        </Grid>
      </Section>
      <Section>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card count={generalCounts["triples_committed"] ?? 0} title="Triples Committed" color="purple" isNotClickable={true}/>
          </Grid>
          <Grid item xs={3}>
            <Card
              count={generalCounts["triples_validated"] ?? 0}
              title="Triple Validated"
              color="green"
              isNotClickable={true}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={generalCounts["triples_reverted"] ?? 0}
              title="Triples Reverted"
              color="red"
              isNotClickable={true}
            />
          </Grid>
          <Grid item xs={3}>
            <Card
              count={generalCounts["Triples Downloaded"] ?? 0}
              title="Triples Downloaded"
              color="blue"
              isNotClickable={true}
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
              handleChangeDuration={handleDurtionChange}
              handleChangeType={handleTypeChange}
              valueType={graphFilter.type}
              valueDuration={graphFilter.by}
              averageText={graphData.length}
            />
          </SectionFlex>
          <BarGraphChart data={graphData} />
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
