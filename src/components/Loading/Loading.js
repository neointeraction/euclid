import React from "react";
import { CircularProgress } from "@mui/material";
import "./loading.styles.css";

const Loading = () => {
  return (
    <div className="loading-table">
      <div className="loading-table-content">
        <CircularProgress />
        <span className="loading-data-text">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;