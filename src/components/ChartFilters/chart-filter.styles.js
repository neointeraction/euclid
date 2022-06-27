import styled from "styled-components";

export const FilterBlock = styled.div`
  flex-basis: 50%;
  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
  & .MuiOutlinedInput-root {
    width: fit-content !important ;
  }
  & .MuiFormControl-root {
    width: auto !important ;
  }
  & .filter-grids {
    margin-left: 10px;
  }
`;

export const SummaryBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const SummaryIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const SummaryText = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #262626;
  text-align: right;
  span {
    display: block;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8c8c8c;
    text-align: right;
  }
`;
