import styled from "styled-components";

export const InputContainer = styled.div`
  & .MuiInputBase-input {
    font-weight: 400;
  }
  & .MuiInputLabel-root.Mui-focused {
    color: #005585;
  }
  & .MuiInputLabel-root {
    font-weight: 600;
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #005585;
  }
  & .Mui-error input {
    border: 1px solid #f5222d;
  }
  & .TextArea-input {
    &:focus-visible {
      outline: none !important;
    }
  }
`;

export const ErrorText = styled.p`
  font-size: 12px;
  margin: 1px 0;
  color: red;
`;
