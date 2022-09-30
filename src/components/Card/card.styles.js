import styled from "styled-components";

export const CardContainer = styled.div`
  cursor: pointer;
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
            : props.color === "orange"
              ? "rgba(250, 173, 20, 0.15)"
              : (props.color ?? "#ccc")};
  border: ${(props) =>
    props.color === "purple"
      ? "1px solid #7e57c2"
      : props.color === "green"
        ? "1px solid #16A034"
        : props.color === "red"
          ? "1px solid #FF6870"
          : props.color === "blue"
            ? "1px solid #005585"
            : props.color === "orange"
              ? "1px solid #FAAD14"
              : "1px solid #aaa"};
  box-shadow: 6px 6px 24px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
`;

export const NormalCardContainer = styled.div`
  height:93px;
  cursor: pointer;
  padding: 12px 20px;
  background: "#F9F9F9";
  border: ${(props) =>
    props.color === "purple"
      ? "1px solid #7e57c2"
      : props.color === "green"
        ? "1px solid #16A034"
        : props.color === "red"
          ? "1px solid #FF6870"
          : props.color === "blue"
            ? "1px solid #005585"
            : props.color === "orange"
              ? "1px solid #FAAD14"
              : (props.color ? `2px solid ${props.color}` : "1px solid #aaa")};
  box-shadow: 6px 6px 24px rgba(0, 0, 0, 0.06);
  border-radius: 3px;
`;

export const CardContainerWithOutClick = styled.div`
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
            : props.color === "orange"
              ? "rgba(250, 173, 20, 0.15)"
              : (props.color ?? "#ccc")};
  border: ${(props) =>
    props.color === "purple"
      ? "1px solid #7e57c2"
      : props.color === "green"
        ? "1px solid #16A034"
        : props.color === "red"
          ? "1px solid #FF6870"
          : props.color === "blue"
            ? "1px solid #005585"
            : props.color === "orange"
              ? "1px solid #FAAD14"
              : (props.color ?? "1px solid #aaa")};
  box-shadow: 6px 6px 24px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
`;

export const CardCount = styled.h1`
  font-weight: 600;
  font-size: 44px;
  line-height: 60px;
  display:flex;
  color: ${(props) =>
    props.color === "purple"
      ? "#7e57c2"
      : props.color === "green"
        ? "#16A034"
        : props.color === "red"
          ? "#FF6870"
          : props.color === "blue"
            ? "#005585"
            : props.color === "orange"
              ? "#FAAD14"
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

export const CardFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardIcon = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  width:100%;
`;

export const CardFilter = styled.div`
  cursor: pointer;
`;
