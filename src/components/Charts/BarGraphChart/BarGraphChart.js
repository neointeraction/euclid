import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const BarGraphChart = ({ data, layout, height, barSize }) => {
  const [graphColors, setGraphColors] = useState([]);

  useEffect(() => {
    if (data[0]?.fill) {
      setGraphColors(data.map((item) => item.fill));
    }
  }, [data])

  const getBarSize = (propSize) => {
    if (propSize) {
      return propSize;
    }
    if (layout === "vertical") {
      return 14;
    } else {
      return 30;
    }
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={height ?? 300}>
        <BarChart
          width={600}
          height={height ?? 300}
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
            barSize={getBarSize(barSize)}
          >
            {data.map((item, i) => {
              return (
                <Cell key={`cell-${i}`} fill={graphColors[i % 20] ?? "#FCBF5C"} />
              )
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraphChart;
