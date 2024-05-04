import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const DoubleBarChart = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [
      {
        label: 'Budget',
        backgroundColor: 'rgba(155, 48, 255, 1)',
        borderColor: 'rgba(155, 48, 255, 1)',
        borderWidth: 1,
        data: props.data1,
      },
      {
        label: 'Expense',
        backgroundColor: 'rgba(255, 215, 0, 1)',
        borderColor: 'rgba(255, 215, 0, 1)',
        borderWidth: 1,
        data: props.data2,
      },
    ],

  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Expense vs Budget",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Category',
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
          font: {
            size: 14,
          },
        },
      },
    },
    barThickness: 30,
  };



  return <Bar data={chartData} options={chartOptions} />;
};

export default DoubleBarChart;
