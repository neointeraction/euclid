import React from "react";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import {
  PieChart as RechartPieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { Button } from "components";

import { PieContainer, ButtonBackContainer } from "./pie.styles";

const PieChart = ({ data, onClickHandler, levelId, setLevelId }) => {
  const handleBack = () => {
    setLevelId(null);
  };
  return (
    <PieContainer>
      <ResponsiveContainer width={"100%"} height={"1000px"} aspect={3}>
        <RechartPieChart>
          <Pie
            dataKey="value"
            data={data}
            innerRadius={200}
            outerRadius={400}
            onClick={(e) => onClickHandler(e)}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip cursor={{ fill: "#DAEAF3" }} />
        </RechartPieChart>
      </ResponsiveContainer>
    </PieContainer>
  );
};

export default PieChart;
