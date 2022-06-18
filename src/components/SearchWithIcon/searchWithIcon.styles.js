import styled from "styled-components";

export const SearchWithIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .MuiInputBase-root {
    margin-top: 0;
    margin-left: 0;
  }
  & input[type="text"] {
    border: 1px solid #8c8c8c;

    font-size: 14px;
    color: #595959;
    width: 90%;
    background: rgba(247, 249, 251, 0.5);
    outline: none;
    border-radius: 4px 0 0 4px;
    font-family: "Nunito Sans", sans-serif;
  }

  & button {
    padding: 8px 12px;
    background: rgba(247, 249, 251, 0.5);
    color: #595959;
    font-size: 16px;
    border: 1px solid #8c8c8c;
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
