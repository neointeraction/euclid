import React from "react";
import { useLocation } from "react-router-dom";

import { PageHeader } from "components";
import TripleHistoryTable from "../components/TripleHistoryTable";

import { Section, Box } from "assets/styles/main.styles";

const TripleHistory = () => {
  const { state } = useLocation();

  return (
    <div>
      <PageHeader pageTitleText="Triple History" />
      <Section>
        <Box>
          <TripleHistoryTable isCompleteList filter={state?.filter} />
        </Box>
      </Section>
    </div>
  );
};

export default TripleHistory;
