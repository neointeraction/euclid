import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarGraphChart = ({ data, layout }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={600}
          height={300}
          layout={layout}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: -10,
            bottom: 5,
          }}
          strokeDasharray="3 3"
        >
          <CartesianGrid strokeDasharray="3 3" />
          {layout === "vertical" ? (
            <>
              <XAxis type="number" tick={{ fontSize: 12, color: "#8C8C8C" }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, color: "#8C8C8C" }}
              />
            </>
          ) : (
            <>
              <XAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, color: "#8C8C8C" }}
              />
              <YAxis type="number" tick={{ fontSize: 12, color: "#8C8C8C" }} />
            </>
          )}

          <Tooltip cursor={{ fill: "#DAEAF3" }} />
          <Legend />
          <Bar
            dataKey="count"
            fill="#FCBF5C" //004C7C
            barSize={layout === "vertical" ? 14 : 30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraphChart;
