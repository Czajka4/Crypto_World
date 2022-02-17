import React from 'react';
import {
    CartesianGrid,
    Legend,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
    Line, 
    ResponsiveContainer 
  } from 'recharts';
  import { useGetCryptoPredictionQuery } from '../services/cryptoApi';

export const SingleCoinChart = ({ coinHistory, currentPrice, coinName }) => {
  const dataArr = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    dataArr.push({
        price: coinHistory?.data?.history[i].price,
        timestamp: new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString() })
  }
  dataArr.reverse()

  const titleH = `Current ${coinName} Price: $ ${currentPrice}  |  Change: ${coinHistory?.data?.change}`

  return (
    <>
    <h2>{titleH}</h2>
    <ResponsiveContainer width='100%' aspect={4.0/3.0}>
      <LineChart  data={dataArr}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
        <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis type="number" allowDecimals={true}
                 allowDataOverflow={true} />
                <Tooltip />
                <Legend />
            <Line type="monotone" dataKey="price" stroke="blue" dot={false} />
    </LineChart>
</ResponsiveContainer>
    </>
  );
};

export const PredictionChart = ({ coinId, coinName }) => {
  const queryData = useGetCryptoPredictionQuery(coinId);
  const chartData = [];

    for (let i = 0; i < queryData?.data?.old?.price?.length; i += 1) {
      chartData.push({
          Old_Price: queryData?.data?.old?.price[i],
          timestamp: new Date(queryData?.data?.old?.timestamp[i] * 1000).toLocaleDateString() })
    }

    for (let i = 0; i < queryData?.data?.new?.price?.length; i += 1) {
      if (i === 0){
        chartData.push({
          Old_Price: queryData?.data?.new?.price[i],
          New_Price: queryData?.data?.new?.price[i],
          timestamp: new Date(queryData?.data?.new?.timestamp[i] * 1000).toLocaleDateString() })
      } else {
      chartData.push({
          New_Price: queryData?.data?.new?.price[i],
          timestamp: new Date(queryData?.data?.new?.timestamp[i] * 1000).toLocaleDateString() })
      }
    }
    const titleH = `Prediction for ${coinName}`

    return (
      <>
      <h2>{titleH}</h2>
      <ResponsiveContainer width='100%' aspect={4.0/3.0}>
        <LineChart  data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
          <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis type="number" allowDecimals={true}
                   allowDataOverflow={true} />
                  <Tooltip />
                  <Legend />
              <Line type="monotone" dataKey="Old_Price" stroke="blue" dot={false} />
              <Line type="monotone" dataKey="New_Price" stroke="red" dot={false} />
      </LineChart>
  </ResponsiveContainer>
      </>
  );
};
