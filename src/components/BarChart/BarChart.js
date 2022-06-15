import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart = ({
  chartLabel = '',
  data,
  chartColor = '#12A8FD',
  barBorderRadius = 3,
  aspectRatio = 2,
  ...rest
}) => {
  const options = {
    responsive: true,
    aspectRatio,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 20,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      },
      datalabels: {
        color: 'white',
        labels: {
          title: {
            display: false,
          },
        },
      },
    },
  };

  const barLabels = data.map((item) => `${item.label}`);
  const barValues = data.map((item) => `${item.value}`);

  const dataForBar = {
    labels: barLabels,
    datasets: [
      {
        label: chartLabel,
        data: barValues,
        backgroundColor: chartColor,
        borderRadius: barBorderRadius,
      },
    ],
  };
  return <Bar options={options} data={dataForBar} {...rest} />;
};

BarChart.propTypes = {
  chartLabel: PropTypes.string,
  data: PropTypes.array.isRequired,
  chartTitle: PropTypes.string,
  chartColor: PropTypes.string.isRequired,
  barBorderRadius: PropTypes.number,
  aspectRatio: PropTypes.number,
};

export default BarChart;
