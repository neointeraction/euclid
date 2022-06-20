import styled from "styled-components";

export const ExtendableSubjectTypeContainer = styled.div`
  & .css-16awh2u-MuiAutocomplete-root .MuiOutlinedInput-root {
    padding: 0;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  background: #daeaf3;
  border: 1px solid #005585;
  border-radius: 4px;
  transition: all;
  margin: 5px 5px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  & .action-icons-wrapper {
    display: flex;
    justify-content: center;
    gap: 10px;
    opacity: 0;
    margin-top: -5px;
  }
  &:hover {
    & .action-icons-wrapper {
      opacity: 1;
      transition: 0.3s all ease-in-out;
    }
  }
`;

export const ExtendableSubjectTypeFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 8px 16px;
  min-width: 260px;
  max-height: 120px;

  & img {
    cursor: pointer;
  }
`;

export const ExtendableSubjectTypeFormHeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
