import React from "react";

import { PageHeader } from "components";
import PurchaseHistoryTable from "../components/PurchaseHistoryTable";

import { Section, Box } from "assets/styles/main.styles";

const PreviousPurchase = () => {
  return (
    <div>
      <PageHeader pageTitleText="Previous Purchases" />
      <Section>
        <Box>
          <PurchaseHistoryTable isCompleteList hideFilter />
        </Box>
      </Section>
    </div>
  );
};

export default PreviousPurchase;
