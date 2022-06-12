import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import MainLayout from "layout/MainLayout";
import MinimalLayout from "layout/MinimalLayout";

import { ContributorDashboard, AddTriple } from "pages/Contributor";
import Uikit from "pages/Uikit";
import GlobalStyleOverrides from "theme/GlobalStyleOverrides";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={GlobalStyleOverrides()}>
        <Routes>
          <Route path="/" exact element={<ContributorDashboard />} />
          <Route element={<MainLayout />}>
            <Route
              path="/contributor-dashboard"
              element={<ContributorDashboard />}
            />
            <Route path="/add-triple" element={<AddTriple />} />
          </Route>
          <Route element={<MinimalLayout />}>
            <Route path="/uikit" element={<Uikit />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
