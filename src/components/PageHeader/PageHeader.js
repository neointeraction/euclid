import React from "react";

import { Button } from "components";

import { ReactComponent as Hello } from "assets/images/icons/hello.svg";

import {
  PageHeaderContainer,
  PageTitle,
  ActionButton,
} from "./pageHeader.styles";

const PageHeader = ({ isHomePage, user, pageTitleText, btnText, onClick }) => {
  return (
    <PageHeaderContainer>
      {isHomePage ? (
        <PageTitle>
          Welcome, {user}
          <span>
            <Hello />
          </span>
        </PageTitle>
      ) : (
        <PageTitle>{pageTitleText}</PageTitle>
      )}
      {btnText && (
        <ActionButton>
          <Button btnText={btnText} variant="contained" onClick={onClick} />
        </ActionButton>
      )}
    </PageHeaderContainer>
  );
};

export default PageHeader;
