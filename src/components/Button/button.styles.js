import styled from "styled-components";

export const ButtonContainer = styled.div`
  & .MuiButton-root {
    width: 100%;
    white-space: nowrap;
  }
  & .Mui-disabled {
    opacity: 0.4 !important ;
    color: rgba(255, 255, 255, 1) !important;
  }
`;
