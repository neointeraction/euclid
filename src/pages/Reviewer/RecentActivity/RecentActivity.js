import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { PageHeader } from "components";
import RecentActivityTable from "../components/RecentActivityTable";

import { Section, Box } from "assets/styles/main.styles";
import { getFullHistory } from "config/api.service";

const RecentActivity = () => {
  const { state } = useLocation();
  const [fullHistory, setFullHistory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [pagination, setPagination] = useState({ page_num: 0, page_size: 10 });

  const saveFullHistoryList = (result) => {
    setFullHistory(result);
  }

  useEffect(() => {
    getFullHistory({ ...pagination, status: selectedFilter }, saveFullHistoryList);
  }, [selectedFilter,pagination])

  const handlePagination = (pagination) => {
    setPagination(pagination);
  }

  return (
    <div>
      <PageHeader pageTitleText="Recent Activity" />
      <Section>
        <Box>
          <RecentActivityTable  isCompleteList handlePagination={handlePagination} filter={state?.filter} dataList={fullHistory} setSelectedFilter={setSelectedFilter} />
        </Box>
      </Section>
    </div>
  );
};

export default RecentActivity;
