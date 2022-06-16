import styled from 'styled-components';

export const SearchWithIconContainer = styled.div`
  display: flex;
  height: 35px;
  & input[type='text'] {
    border: 1px solid #8c8c8c;
    padding: 4px 10px;
    font-size: 14px;
    color: #595959;
    float: left;
    width: 90%;
    background: rgba(247, 249, 251, 0.5);
    outline: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    font-family: 'Nunito Sans', sans-serif;
  }

  & button {
    float: left;
    width: 10%;
    padding: 10px;
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
