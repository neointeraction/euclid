import { TableContainer } from '@mui/material';
import styled from 'styled-components';

// styles for ProvideEvidenceModalBox
export const ProvideEvidenceModalBoxContainer = styled.div`
  max-width: 500px;
  background-color: #fff;
  color: #262626;
  padding: 10px 20px 20px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  overflow-x: hidden;

  & .modal-heading {
    margin-top: 25px;
    margin-bottom: 10px;
  }

  & .form-wrap {
    margin-top: -16px;
  }
`;

export const ModalCloseIconContainer = styled.div`
  position: relative;

  & .icon-itself {
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 0px;
  }
`;

// styles for the evidence details modal component
export const CustomTableContainer = styled(TableContainer)`
  padding: 8px;
  box-shadow: 0px 2px 28px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  max-width: 525;

  & .th-tabel-cell {
    font-weight: 600;
    padding-bottom: 4px;
  }

  & .red-p {
    color: #833b3b;
    font-size: 14px;
  }

  & .with-info-icon-wrap {
    display: flex;
    align-items: center;
    gap: 9.5px;
    font-size: 16px;
    margin-top: -16px;
  }
`;
