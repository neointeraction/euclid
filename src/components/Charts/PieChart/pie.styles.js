import styled from "styled-components";

export const PieContainer = styled.div`
  margin: 0;
  position: relative;
  .recharts-surface,
  .recharts-responsive-container,
  .recharts-wrapper {
    width: 2000px;
    width: 100% !important;
    height: 100% !important;
  }
  .recharts-layer {
    cursor: pointer;
  }
`;

export const ButtonBackContainer = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  top: 20px;
`;
