import React from "react";

import { PageHeader } from "components";
import UserTable from "./components/UserTable";

import { Box, Section } from "assets/styles/main.styles";

const UserList = () => {
  return (
    <div>
      <PageHeader pageTitleText="Users" />
      <Section>
        <Box>
          <UserTable hideFilter />
        </Box>
      </Section>
    </div>
  );
};

export default UserList;
