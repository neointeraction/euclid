import styled from "styled-components";

export const TagContainer = styled.div`
  & .MuiChip-root {
    background-color: #f0f0f0;
    border: ${({ type }) =>
      type === "committed"
        ? "1px solid #005585"
        : type === "reverted"
        ? "1px solid #FF6870"
        : type === "approved"
        ? "1px solid #16A034"
        : type === "in draft"
        ? "1px solid #FAAD14"
        : "1px solid #262626"};
    color: ${({ type }) =>
      type === "committed"
        ? "#005585"
        : type === "reverted"
        ? "#FF6870"
        : type === "approved"
        ? "#16A034"
        : type === "in draft"
        ? "#FAAD14"
        : "#262626"};
    padding: 6px 10px;
  }
`;
