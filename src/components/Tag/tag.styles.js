import styled from "styled-components";

export const TagContainer = styled.div`
  & .MuiChip-root {
    background-color: #f0f0f0;
    border: ${({ type }) =>
    type === "committed" || type === "invalid evidence" || type === "invalid"
      ? "1px solid #005585"
      : type === "reverted" || type === "triples reverted" || type === "reverted"
        ? "1px solid #FF6870"
        : type === "approved" || type === "triples validated" || type === "valid"
          ? "1px solid #16A034"
          : type === "in draft" || type === "triples flagged" || type === "flagged"
            ? "1px solid #FAAD14"
            : "1px solid #262626"};
    color: ${({ type }) =>
    type === "committed" || type === "invalid evidence" || type === "invalid"
      ? "#005585"
      : type === "reverted" || type === "triples reverted" || type === "reverted"
        ? "#FF6870"
        : type === "approved" || type === "triples validated" || type === "valid"
          ? "#16A034"
          : type === "in draft" || type === "triples flagged" || type === "flagged"
            ? "#FAAD14"
            : "#262626"};
    padding: 6px 10px;
  }
`;
