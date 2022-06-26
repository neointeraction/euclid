import React from "react";
import { useLocation } from "react-router-dom";

import { PageHeader } from "components";
import RecentActivityTable from "../components/RecentActivityTable";

import { Section, Box } from "assets/styles/main.styles";

const RecentActivity = () => {
  const { state } = useLocation();

  return (
    <div>
      <PageHeader pageTitleText="Recent Activity" />
      <Section>
        <Box>
          <RecentActivityTable isCompleteList filter={state?.filter} />
        </Box>
      </Section>
    </div>
  );
};

export default RecentActivity;
