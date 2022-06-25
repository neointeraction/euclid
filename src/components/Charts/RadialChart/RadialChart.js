import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

import { RadialChartContainer } from "./radial-chart.styles.";

// const style = {
//   top: "50%",
//   right: 0,
//   transform: "translate(0, -50%)",
//   lineHeight: "24px",
// };

// const circleSize = 300;

const RadialChart = ({ data, circleSize }) => {
  return (
    <RadialChartContainer>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="70%"
          barSize={16}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            minAngle={20}
            clockWise
            dataKey="value"
            cornerRadius={circleSize / 2}
            fill="#82ca9d"
          />

          <text
            x={circleSize / 1.6}
            y={circleSize / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            className="progress-label"
          >
            {data[0].value}%
          </text>
          <text
            x={circleSize / 1.6}
            y={circleSize / 1.7}
            textAnchor="middle"
            dominantBaseline="middle"
            className="progress-sub-label"
          >
            Overall Satisfaction
          </text>

          {/* <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          /> */}
        </RadialBarChart>
      </ResponsiveContainer>
    </RadialChartContainer>
  );
};

export default RadialChart;
