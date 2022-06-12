import styled from "styled-components";

export const DropdownContainer = styled.div`
  & .MuiInputLabel-root {
    position: static;
    transform-origin: left;
    transform: translate(0, -6px) scale(0.75);
  }
  & .MuiInputLabel-root.Mui-focused {
    color: #005585;
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #005585;
  }
  & .MuiSelect-select {
    font-size: 14px;
    padding-top: 6px;
    padding-bottom: 6px;
  }
`;
