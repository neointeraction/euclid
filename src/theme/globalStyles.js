import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito Sans', sans-serif;
    background: #F3F3F4 ;
  }

  .MuiMenuItem-root {
      font-size: 14px !important;
    }
    
  .MuiAutocomplete-popper {
    font-size: 14px !important;
  }

  .table-nav-link{
    font-weight: 400 ;
    color: #262626 ;
    text-decoration: none ;
    cursor: pointer;
    &:hover{
      text-decoration: underline ;
    }
  }

  .popper-custom{
     .MuiPaper-root{
         box-shadow: 0px 2px 28px rgba(0, 0, 0, 0.12) !important;
      }
  }

  .divider-margin{
    margin: 14px 0 !important;
  }

  .custom-checkbox .MuiFormControlLabel-label{
    font-size: 14px ;
  }

  .custom-checkbox .Mui-checked{
    color: #005585 !important;
  }
  .table-checkbox{
    padding: 0  !important;
  }

  .table-checkbox.Mui-checked{
    color: #005585 !important;
  }
  .MuiList-root {
    padding: 0 !important ;
  }
  .upload-chip{
    border-radius: 4px !important;
    padding: 17px 2px !important;
  }
`;

export default GlobalStyle;
