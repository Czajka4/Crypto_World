import React from 'react'
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptoInfoQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News} from '../components'

import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetchting } = useGetCryptoInfoQuery(10);
  const globalStats = data?.data?.stats;

  if(isFetchting) return <Loader />;

  return (
   <>
   <Title level={2} className="heading">Crypto World Stats</Title>
   <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={globalStats?.totalExchanges} /></Col>
    </Row>
    <div className="home-heading-container">
      <Title level={2} class="home-title">Top 10 Cryptocurrencies</Title>
      <Title level={3} class="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
    </div>
    <Cryptocurrencies simplified/>

    <div className="home-heading-container">
      <Title level={2} class="home-title">Latest Crypto News</Title>
      <Title level={3} class="show-more"><Link to="/news">Show More</Link></Title>
    </div>
    <News simplified />
   </>
  )
}

export default Homepage