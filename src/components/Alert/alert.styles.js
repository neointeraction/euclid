import styled from "styled-components";

// a container to wrap the alert
export const AlertContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  gap: 16px;
  color: #262626;
  background: ${({ type }) =>
    type === "success"
      ? "#D8FFC5"
      : type === "warning"
      ? "#FFE8BA"
      : "#FFD6D9"};
  box-shadow: 0px 2px 19px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  border: ${({ type }) =>
    type === "success"
      ? "1px solid #16a034"
      : type === "warning"
      ? "1px solid #FAAD14"
      : "1px solid #FF6870"};
  & p {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    margin-left: 10px;
  }
`;

export const AletBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;
