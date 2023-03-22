import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Chart from 'chart.js/auto';
import { useQuery } from 'react-query';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import axiosurl from '../url';

const Graph = () => {
  const { sheetId } = useParams();

  const fetchGraph = async () => {
    const { data } = await axios({
      url: axiosurl.fetchGraph,
      method: 'get',
      params: {
        sheet_id: sheetId,
      },
    });
    console.log(data);
    return data;
  };

  const { data, isLoading, error } = useQuery(['graph', sheetId], fetchGraph, {
    refetchOnWindowFocus: false, // window focus 이동 후에 refetch 하지 않음
    placeholderData: '',
  });

  console.log(data);

  const data2 = {
    datasets: [
      {
        type: 'bar',
        label: '수입',
        backgroundColor: '#4ade80',
        data: data.incomeArr,
      },
      {
        type: 'bar',
        label: '지출',
        backgroundColor: '#f87171',
        data: data.spendArr,
      },
    ],
  };

  const options = {
    spanGaps: true,
    maintainAspectRatio: false,
    maxBarThickness: 15,
    grouped: true,
    interaction: {
      mode: 'index',
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          padding: 10,
          color: '#999999',
          font: {
            family: "'Pretendard-Regular', sans-serif",
            lineHeight: 1,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(192, 132, 252, 0.8)',
        padding: 10,
        bodySpacing: 5,
        bodyFont: {
          font: {
            family: "'Pretendard-Regular', sans-serif",
          },
        },
        usePointStyle: true,
        filter: (item) => item.parsed.y !== null,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => {
            let label = context.dataset.label + '' || '';
            return context.parsed.y !== null
              ? label + ': ' + context.parsed.y + '원'
              : null;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawTicks: true,
          tickLength: 4,
          color: '#999999',
        },
        axis: 'x',
        position: 'bottom',
        ticks: {
          padding: 5,
          color: '#999999',
        },
      },
      y: {
        type: 'linear',
        border: { dash: [3, 3] },
        grid: {
          color: '#999999',
        },
        //max: 5,
        //min: 0,
        axis: 'y',
        display: true,
        position: 'left',
        ticks: {
          color: '#999999',
          stepSize: 100000,
        },
      },
    },
  };

  return (
    <div className="relative flex flex-col p-3 bg-white  dark:bg-gray-700 w-full mb-6 shadow-lg rounded">
      <Bar type="bar" data={data2} options={options} />
    </div>
  );
};

export default Graph;
