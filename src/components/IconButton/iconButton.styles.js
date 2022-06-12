import styled from "styled-components";

export const ButtonContainer = styled.div`
  & .MuiFab-root {
    background: ${(props) => (props.type ? "#C4C4C4" : "#005585")};
    box-shadow: none;
    &:hover {
      background: ${(props) => (props.type ? "#DAEAF3" : "#005585")};
    }
  }
`;
