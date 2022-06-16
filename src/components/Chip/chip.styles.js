import styled from 'styled-components';

export const ChipContainer = styled.div`
  & .MuiChip-root {
  }
`;

export const ChipChildrenWrap = styled.div`
  padding: 10px;
  color: #262626;
  display: flex;
  align-items: center;
  gap: 4px;

  & img {
    margin-left: 6px;
    cursor: pointer;
  }
`;
