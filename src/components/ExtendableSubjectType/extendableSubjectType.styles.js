import styled from 'styled-components';

export const ExtendableSubjectTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  background: #daeaf3;
  border: 1px solid #005585;
  border-radius: 4px;
  overflow-x: auto;
  transition: all;
`;

export const ExtendableSubjectTypeFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 8px 16px;
  min-width: 260px;
  min-height: 120px;

  & img {
    cursor: pointer;
  }
`;
