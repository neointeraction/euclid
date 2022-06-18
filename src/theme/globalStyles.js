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
    &:hover{
      text-decoration: underline ;
    }
  }
`;

export default GlobalStyle;
