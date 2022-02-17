import React, { useEffect, useState } from 'react';
import { Select, Form, Button, Col } from 'antd';

import { useGetCryptoInfoQuery } from '../services/cryptoApi';
import { PredictionChart } from './Charts';
import Loader from './Loader';


const Prediction = () => {
  const { data: cryptosList, isFetching } = useGetCryptoInfoQuery(100);
  const [cryptos, setCryptos] = useState({});
  const [cryptoId, setcryptoId] = useState('Qwsogvtv82FCd');
  const [searchTerm, setSearchTerm] = useState('Bitcoin');

  const { data } = useGetCryptoInfoQuery(100);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase() === searchTerm.toLowerCase());
    setCryptos(filteredData);
    if(typeof cryptos !== 'undefined') setcryptoId(cryptos[0]?.uuid);
  }, [cryptosList, searchTerm]);

  useEffect(() => {
    try {
      setcryptoId(cryptos[0]?.uuid);
    }
    catch(err) {
      console.log("========== SET CRYPTO ERROR");
      console.log(err.message);
    }

  }, [cryptos]);
  
  if (isFetching) return <Loader />;

   return (    
    <Col className="coin-prediction-container"> 
      <Col span={6}>
          <Select
            showSearch
            defaultValue="Bitcoin"
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => { 
              setSearchTerm(value);           
            }}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
          <Col className="predict-chart-constainter">
        { cryptoId ? <PredictionChart coinId={cryptoId} coinName={searchTerm} /> : '- No currency selected'}
        </Col>
      </Col>
  )
};

export default Prediction

