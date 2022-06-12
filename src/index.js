import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "./assets/styles/index.css";
import GlobalStyle from "./theme/globalStyles";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <GlobalStyle />
      <App />
    </HashRouter>
  </React.StrictMode>
);
