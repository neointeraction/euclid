import React from "react";

import { PageHeader } from "components";
import CustomerTable from "./components/CustomerTable";

import { Box, Section } from "assets/styles/main.styles";

const CustomerList = () => {
  return (
    <div>
      <PageHeader pageTitleText="Customers" />
      <Section>
        <Box>
          <CustomerTable hideFilter />
        </Box>
      </Section>
    </div>
  );
};

export default CustomerList;
