import styled, { keyframes } from "styled-components";

export const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #daeaf3;
  border-radius: 8px;
  min-height: 142px;
  min-width: 142px;
  margin: 10px 0;
  position: relative;
`;

const ExpandCount = keyframes`
 0% { height: 142px;  }
 100% { height: 300px; }
`;

const CollapseCount = keyframes`
 0% { height: 300px;  }
 100% { height: 142px; }
`;

export const PointBlock = styled.div`
  background: #005585;
  border-radius: 8px;
  height: 142px;
  min-height: 142px;
  min-width: 142px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  animation-name: ${(props) =>
    props.isExpanded
      ? ExpandCount
      : props.isExpanded === null
      ? "none"
      : CollapseCount};
  animation-duration: 0.4s;
  animation-fill-mode: forwards;
`;

export const PointText = styled.p`
  font-weight: 500;
  font-size: 48px;
  line-height: 48px;
  text-align: center;
  & span {
    display: block;
    font-size: 14px;
    line-height: 26px;
  }
`;

export const BannerContent = styled.div`
  padding: 0 20px;
`;

export const BannerInfoBlock = styled.div`
  padding: 0 20px;
  flex-grow: 1;
`;

export const InfoText = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 38px;
  color: #262626;
  margin-bottom: 16px;
`;

export const InfoDescription = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #262626;
`;

export const BannerControl = styled.div`
  position: absolute;
  right: 30px;
  bottom: 24px;
`;

export const BannerBlock = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Expand = keyframes`
 0% { height: 0; opacity: 0;  }
 100% { height: 150px; opacity: 1;}
`;

const Collapse = keyframes`
 0% { height: 150px; opacity: 1;  }
 100% { height: 0; opacity: 0;}
`;

export const ExpandContent = styled.div`
  height: 0;
  animation-name: ${(props) =>
    props.isExpanded ? Expand : props.isExpanded === null ? "none" : Collapse};
  animation-duration: 0.4s;
  animation-fill-mode: forwards;
  overflow: hidden;
`;

export const ExpandTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #262626;
  margin-bottom: 10px;
`;

export const ExpandText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #262626;
`;

export const ExpandTextBlock = styled.div`
  margin: 10px 0;
`;
