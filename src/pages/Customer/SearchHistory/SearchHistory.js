import React from "react";

import { PageHeader } from "components";
import SearchHistoryTable from "../components/SearchHistoryTable";

import { Section, Box } from "assets/styles/main.styles";

const SearchHistory = () => {
  return (
    <div>
      <PageHeader pageTitleText="Search and History" />
      <Section>
        <Box>
          <SearchHistoryTable isCompleteList hideFilter />
        </Box>
      </Section>
    </div>
  );
};

export default SearchHistory;
