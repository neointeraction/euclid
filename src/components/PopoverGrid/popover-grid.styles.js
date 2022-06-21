import styled from "styled-components";

export const CustomTableContainer = styled.div`
  & .th-tabel-cell {
    font-weight: 600;
    padding-bottom: 4px;
  }

  & .red-p {
    color: #833b3b;
    font-size: 12px;
    margin-top: 10px;
  }

  & .with-info-icon-wrap {
    display: flex;
    align-items: center;
    gap: 9.5px;
    font-size: 12px;
    margin-top: -16px;
  }
  & .table-row-cell {
    font-size: 12px;
    vertical-align: text-top;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;

export const EvidenceDetailModalBoxWrap = styled.div`
  position: relative;
  padding: 10px;
  border-radius: 4px;
`;
