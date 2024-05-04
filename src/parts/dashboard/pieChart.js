import React from 'react';
import { Pie } from 'react-chartjs-2';
import chroma from 'chroma-js';

const PieChart = (props) => {
  const labels = props.labels;
  const dataPoints = props.data;

  const colorScale1 = chroma.scale(['#FF2347', '#879EEB', '#321D32']).mode('lch').colors(dataPoints.length);



  let finalColors = colorScale1

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: finalColors,
        borderColor: finalColors.map(color => chroma(color).darken().hex()),
        borderWidth: 1,
      },
    ],

  };

  const options1 = {
    maintainAspectRatio: true, plugins: {
      title: {
        display: true,
        text: 'Category',
        font: {
          size: 16,
        },
      },
    },
  };


  return <Pie data={data} options={options1} />;
};

export default PieChart;
