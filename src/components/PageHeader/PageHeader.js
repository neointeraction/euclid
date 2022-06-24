import React from "react";

import { Button } from "components";

import { ReactComponent as Hello } from "assets/images/icons/hello.svg";

import {
  PageHeaderContainer,
  PageTitle,
  ActionButton,
  SubText,
} from "./pageHeader.styles";

const PageHeader = ({
  isHomePage,
  user,
  subText,
  pageTitleText,
  btnText,
  onClick,
  rightSideContent,
}) => {
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
        <div>
          {subText && <SubText>{subText}</SubText>}
          <PageTitle>{pageTitleText}</PageTitle>
        </div>
      )}
      {btnText && !rightSideContent && (
        <ActionButton>
          <Button btnText={btnText} variant="contained" onClick={onClick} />
        </ActionButton>
      )}
      {rightSideContent && rightSideContent}
    </PageHeaderContainer>
  );
};

export default PageHeader;
