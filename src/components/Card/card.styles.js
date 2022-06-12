import styled from "styled-components";

export const CardContainer = styled.div`
  padding: 12px 20px;
  background: ${(props) =>
    props.color === "purple"
      ? "#e5d6ff"
      : props.color === "green"
      ? "#F6FFF8"
      : props.color === "red"
      ? "#FFEFF0"
      : props.color === "blue"
      ? "#DAEAF3"
      : "#ccc"};
  border: ${(props) =>
    props.color === "purple"
      ? "1px solid #7e57c2"
      : props.color === "green"
      ? "1px solid #16A034"
      : props.color === "red"
      ? "1px solid #FF6870"
      : props.color === "blue"
      ? "1px solid #005585"
      : "1px solid #aaa"};
  box-shadow: 6px 6px 24px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
`;

export const CardCount = styled.h1`
  font-weight: 600;
  font-size: 44px;
  line-height: 60px;
  color: ${(props) =>
    props.color === "purple"
      ? "#7e57c2"
      : props.color === "green"
      ? "#16A034"
      : props.color === "red"
      ? "#FF6870"
      : props.color === "blue"
      ? "#005585"
      : "#ccc"};
  margin-bottom: 14px;
`;

export const CardText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #262626;
  margin-bottom: 0;
`;

export const CardFlex = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardFilter = styled.p`
  cursor: pointer;
`;
