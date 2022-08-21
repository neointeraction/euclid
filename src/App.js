import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyleOverrides from "theme/GlobalStyleOverrides";

import MainLayout from "layout/MainLayout";
import MinimalLayout from "layout/MinimalLayout";

import {
  ContributorDashboard,
  AddTriple,
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
  FlaggedTriple,
} from "pages/Reviewer";

import {
  AdminDashboard,
  UserList,
  CustomerList,
  AdminFlaggedTriple,
} from "pages/Admin";

import Login from "pages/Login";
import UserSettings from "pages/UserSettings";
import Uikit from "pages/Uikit";
import PrivateRouteComponent from "config/auth-guard";
import { contributorRoutes } from "components/Header/routes/routes.config";
import { ADMIN, CONTRIBUTOR, CUSTOMER, REVIEWER } from "config/constants";

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
              element={<PrivateRouteComponent roles={[CONTRIBUTOR]} shouldAuthenticate={true} child={<ContributorDashboard />} />}
            />
            <Route path="/add-triple" element={<PrivateRouteComponent roles={[CONTRIBUTOR]} shouldAuthenticate={true} child={<AddTriple />} />} />
            <Route path="/triple-history" element={<PrivateRouteComponent roles={[CONTRIBUTOR]} shouldAuthenticate={true} child={<TripleHistory />} />} />
            {/* Customer  */}
            <Route path="/customer-dashboard" element={<PrivateRouteComponent roles={[CUSTOMER]} shouldAuthenticate={true} child={<CustomerDashboard />} />} />
            <Route path="/query-triple" element={<PrivateRouteComponent roles={[CUSTOMER]} shouldAuthenticate={true} child={<QueryTriple />} />} />
            <Route path="/cart" element={<PrivateRouteComponent roles={[CUSTOMER]} shouldAuthenticate={true} child={<Cart />} />} />
            <Route path="/search-history" element={<PrivateRouteComponent roles={[CUSTOMER]} shouldAuthenticate={true} child={<SearchHistory />} />} />
            <Route path="/previous-purchases" element={<PrivateRouteComponent roles={[CUSTOMER]} shouldAuthenticate={true} child={<PreviousPurchase />} />} />
            <Route path="/search-result" element={<PrivateRouteComponent roles={[CUSTOMER]} shouldAuthenticate={true} child={<SearchResult />} />} />
            {/* Reviewer  */}
            <Route path="/reviewer-dashboard" element={<PrivateRouteComponent roles={[REVIEWER]} shouldAuthenticate={true} child={<ReviewerDashboard />} />} />
            <Route path="/recent-activity" element={<PrivateRouteComponent roles={[REVIEWER]} shouldAuthenticate={true} child={<RecentActivity />} />} />
            <Route path="/evidences" element={<PrivateRouteComponent roles={[REVIEWER]} shouldAuthenticate={true} child={<Evidences />} />} />
            <Route path="/triple-view" element={<PrivateRouteComponent roles={[REVIEWER]} shouldAuthenticate={true} child={<ReviewerViewTriple />} />} />
            <Route path="/edit-triple" element={<PrivateRouteComponent roles={[REVIEWER]} shouldAuthenticate={true} child={<EditTriple />} />} />
            <Route path="/flagged-triple" element={<PrivateRouteComponent roles={[REVIEWER]} shouldAuthenticate={true} child={<FlaggedTriple />} />} />
            {/* Admin  */}
            <Route path="/admin-dashboard" element={<PrivateRouteComponent roles={[ADMIN]} shouldAuthenticate={true} child={<AdminDashboard />} />} />
            <Route path="/users" element={<PrivateRouteComponent roles={[ADMIN]} shouldAuthenticate={true} child={<UserList />} />} />
            <Route path="/customers" element={<PrivateRouteComponent roles={[ADMIN]} shouldAuthenticate={true} child={<CustomerList />} />} />
            <Route
              path="/admin-flagged-triple"
              element={<PrivateRouteComponent roles={[ADMIN]} shouldAuthenticate={true} child={<AdminFlaggedTriple />} />}
            />
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
