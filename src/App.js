import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyleOverrides from "theme/GlobalStyleOverrides";

import MainLayout from "layout/MainLayout";
import MinimalLayout from "layout/MinimalLayout";

import {
  ContributorDashboard,
  AddTriple,
  ViewTriple,
  TripleHistory,
} from "pages/Contributor";
import { CustomerDashboard } from "pages/Customer";

import Login from "pages/Login";
import UserSettings from "pages/UserSettings";
import Uikit from "pages/Uikit";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={GlobalStyleOverrides()}>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route element={<MainLayout />}>
            <Route
              path="/contributor-dashboard"
              element={<ContributorDashboard />}
            />
            <Route path="/add-triple" element={<AddTriple />} />
            <Route path="/triple-history" element={<TripleHistory />} />
            <Route path="/view-triple" element={<ViewTriple />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/user-settings" element={<UserSettings />} />
          </Route>
          <Route element={<MinimalLayout />}>
            <Route path="/uikit" element={<Uikit />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
