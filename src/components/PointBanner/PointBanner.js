import React, { useState } from "react";

import { Button } from "components";

import { ReactComponent as BannerIcon } from "assets/images/banner-icon.svg";
import { ReactComponent as Confetti } from "assets/images/icons/confetti.svg";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

import {
  BannerContainer,
  PointBlock,
  PointText,
  BannerContent,
  BannerInfoBlock,
  InfoText,
  InfoDescription,
  BannerControl,
  BannerBlock,
  ExpandContent,
  ExpandTitle,
  ExpandText,
  ExpandTextBlock,
} from "./pointBanner.styles";

const PointBanner = ({ points, user, infoText }) => {
  const [expand, setExpand] = useState(null);

  const expandPanel = () => {
    setExpand(!expand);
  };

  return (
    <BannerContainer isExpanded={expand} height={500}>
      <PointBlock isExpanded={expand}>
        <PointText>
          {points} <span>Points</span>
        </PointText>
      </PointBlock>
      <BannerBlock>
        <BannerContent>
          <BannerIcon />
        </BannerContent>
        <BannerInfoBlock>
          <InfoText>
            Congratulations, {user} <Confetti />
          </InfoText>
          <InfoDescription>{infoText}</InfoDescription>

          <ExpandContent isExpanded={expand}>
            <ExpandTextBlock>
              <ExpandTitle>About</ExpandTitle>
              <ExpandText>
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content.
              </ExpandText>
            </ExpandTextBlock>
            <ExpandTextBlock>
              <ExpandTitle>Details</ExpandTitle>
              <ExpandText>
                Lorem ipsum may be used as a placeholder before final copy is
                available.
              </ExpandText>
            </ExpandTextBlock>
          </ExpandContent>
        </BannerInfoBlock>
        <BannerControl>
          <Button
            btnText={expand ? "Less" : "Learn More"}
            variant="text"
            endIcon={
              expand ? (
                <KeyboardArrowUpOutlinedIcon />
              ) : (
                <KeyboardArrowDownOutlinedIcon />
              )
            }
            onClick={expandPanel}
          />
        </BannerControl>
      </BannerBlock>
    </BannerContainer>
  );
};

export default PointBanner;
