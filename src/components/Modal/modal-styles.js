import styled from "styled-components";

export const ModalContainer = styled.div`
  margin: 0;
`;

export const MOdalContent = styled.div`
  padding: 0 20px 20px 20px;
`;

export const ModalClose = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 12px 0 0;
  svg {
    cursor: pointer;
  }
`;

export const ModalTitle = styled.h1`
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #262626;
  margin-bottom: 20px;
`;
