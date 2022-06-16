import styled from "styled-components";

export const AutoCompleteContainer = styled.div`
  margin: 0;
  & .MuiAutocomplete-inputRoot {
    padding: 0 10px !important;
    font-size: 14px;
    background-color: #fff;
  }
  & .MuiAutocomplete-inputRoot.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #005585;
  }
`;
