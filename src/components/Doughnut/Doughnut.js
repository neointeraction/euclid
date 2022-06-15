import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

//TODO: find a way to remove the labels from the top and display the title in the doughnut content instead of the values

const CustomDoughnut = ({
  data,
  labels,
  datalabelStyles = {
    color: 'white',
    labels: {
      title: {
        font: {
          weight: '600',
          size: '18px',
        },
      },
    },
  },
}) => {
  // extract the value and bg colors
  const dataValues = data.map((item) => item.value);
  const dataColors = data.map((item) => `${item.color}`);

  return (
    <div>
      <Doughnut
        options={{
          plugins: {
            datalabels: {
              ...datalabelStyles,
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: dataColors,
              borderWidth: 0,
            },
          ],
          datasetIdKey: 'labels',
        }}
      />
    </div>
  );
};

CustomDoughnut.propTypes = {
  labels: PropTypes.array, // should be of the same length as data
  data: PropTypes.array, // actual data array of object values like {value:string|number;color:colorCode}
  datalabelStyles: PropTypes.object, // refer to https://chartjs-plugin-datalabels.netlify.app/guide/labels.html for more
};

export default CustomDoughnut;
