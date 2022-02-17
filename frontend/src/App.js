import React from 'react'
import { Routes, Route, Link, Navigate} from 'react-router-dom';
import {Layout, Typography, Space} from 'antd';

import { Login, Logout,  Navbar, Homepage, Prediction, Cryptocurrencies, CryptoDetails, News, SignUp } from './components';
import './App.css'
import { isAuthenticated } from './utils/auth';

const App = () => {

  return (
    <div className='app'>
        <div className='navbar'>
            <Navbar />
        </div>
        <div className='main'>
            <Layout>
                <div className='routes'>
                        <Routes>
                            <Route path="/" element={isAuthenticated() === true ? <Homepage /> : <Navigate to="/login" />} />      
                            <Route path="/login" element={isAuthenticated() === true ? <Navigate to="/" /> : <Login /> } />      
                            <Route path="/logout" element={isAuthenticated() === true ? <Logout /> : <Navigate to="/login" />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/prediction" element={isAuthenticated() === true ? <Prediction /> : <Navigate to="/login" />} />
                            <Route path="/cryptocurrencies" element={isAuthenticated() === true ? <Cryptocurrencies /> : <Navigate to="/login" />} />
                            <Route path="/crypto/:coinId" element={isAuthenticated() === true ? <CryptoDetails /> : <Navigate to="/login" />} />
                            <Route path="/news" element={isAuthenticated() === true ? <News /> : <Navigate to="/login" />} />                                                  
                         </Routes>
                </div>
            </Layout>        
        <div className='footer' >
            <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                CryptoWorld <br />
                2022
            </Typography.Title>
            <Space>
                <Link to="/">Home</Link>
            </Space>
        </div> 
        </div>         
    </div>
  )
}

export default App