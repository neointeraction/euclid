import styled from "styled-components";

export const TableSubContainer = styled.h1`
  background: #f1f1f5;
  border-radius: 0px 0px 5px 5px;
  padding: 20px;
`;

export const ObjectFlex = styled.h1`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  & h4 {
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #2c5aa0;
    flex-basis: 20%;
  }
  & p {
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #0e0e0e;
  }
`;

export const CustomTable = styled.div`
  display: block;
  overflow: auto;
  .table {
    border-spacing: 0;
    .thead {
      overflow-y: auto;
      overflow-x: hidden;
    }
    .tbody {
      overflow-y: auto;
      overflow-x: hidden;
      /* height: 250px; */
    }
    .tr {
      &:hover {
        .td {
          background: #daeaf3;
        }
      }
      &:last-child {
        .td {
          border-bottom: 0;
        }
      }
    }
    .th {
      margin: 0;
      position: relative;
      background: #f3f3f4;
      padding: 12px 20px;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #262626;
      &:last-child {
        border-right: 0;
      }
      .resizer {
        right: 0;
        background: #fff;
        width: 0.5px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        touch-action: none;
        &.isResizing {
          background: #968e75;
        }
      }
    }
    .td {
      background: #fff;
      padding: 14px 20px;
      border-bottom: 1px solid #f0f0f0;
      font-weight: 300;
      font-size: 16px;
      line-height: 22px;
      color: #262626;
      &.highlight {
        background: #f2f2f2;
      }

      &:last-child {
        border-right: 0;
      }
      .resizer {
        right: 0;
        background: #fff;
        width: 0.5px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        touch-action: none;
        &.isResizing {
          background: #968e75;
        }
      }
    }
  }
  .sort-icon {
    margin-left: 10px;
    margin-bottom: -6px;
    display: inline-block;
    vertical-align: middle;
  }
  .inner-td {
    padding: 0 !important;
  }

  .empty-table {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .no-data-text {
    font-size: 14px;
    font-weight: 300;
    margin-top: 10px;
  }
  /* pagination-styles  */

  .pagination-custom {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0;
    .MuiInputBase-root {
      margin-top: 0;
    }
    button {
      border: none;
    }
  }

  .pagination-btn {
    background: #005585;
    padding: 8px;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    color: #fff;
    margin-left: 5px;
    transition: 0.3s all ease-in-out;
    cursor: pointer;
  }

  .pagination-btn:hover {
    background: #013654;
    transition: 0.3s all ease-in-out;
  }

  .pagination-btn:disabled {
    opacity: 0.4;
    cursor: initial;
  }

  .page-count-info {
    margin: 0 10px;
  }

  .page-count {
    font-weight: 400;
    font-size: 12px;
    color: #a3a3a3;
    margin-left: 5px;
  }

  .table-input input {
    padding: 5.5px 5px 5.5px 9px;
    width: 50px !important;
  }

  .table-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
  }

  .pagination-flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .table-label {
    margin-right: 5px;
    color: #435055;
    font-size: 14px;
    color: #a3a3a3;
  }

  .table-select {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .table-select .MuiSelect-select {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }

  .empty-table-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .custom-table .MuiChip-filled {
    height: auto;
  }
`;

export const FilterChips = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  div {
    margin-left: 10px;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
  ${FilterChips} {
    margin-left: ${(props) => (props.hideSearch ? 0 : "26px")};
  }
`;
