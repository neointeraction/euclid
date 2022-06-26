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

import {
  CustomerDashboard,
  QueryTriple,
  SearchHistory,
  PreviousPurchase,
  Cart,
  SearchResult,
} from "pages/Customer";

import {
  ReviewerDashboard,
  RecentActivity,
  Evidences,
  ReviewerViewTriple,
  EditTriple,
} from "pages/Reviewer";

import { AdminDashboard, UserList, CustomerList } from "pages/Admin";

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
            {/* Contributor  */}
            <Route
              path="/contributor-dashboard"
              element={<ContributorDashboard />}
            />
            <Route path="/add-triple" element={<AddTriple />} />
            <Route path="/triple-history" element={<TripleHistory />} />
            <Route path="/view-triple" element={<ViewTriple />} />
            {/* Customer  */}
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/query-triple" element={<QueryTriple />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search-history" element={<SearchHistory />} />
            <Route path="/previous-purchases" element={<PreviousPurchase />} />
            <Route path="/search-result" element={<SearchResult />} />
            {/* Reviewer  */}
            <Route path="/reviewer-dashboard" element={<ReviewerDashboard />} />
            <Route path="/recent-activity" element={<RecentActivity />} />
            <Route path="/evidences" element={<Evidences />} />
            <Route path="/triple-view" element={<ReviewerViewTriple />} />
            <Route path="/edit-triple" element={<EditTriple />} />
            {/* Admin  */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/customers" element={<CustomerList />} />
            {/* Settings  */}
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
