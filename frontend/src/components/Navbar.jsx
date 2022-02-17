import React, {useState, useEffect} from 'react'
import { Button, Menu, Typography, Avatar, Divider } from 'antd';
import {Link} from 'react-router-dom';
import { HomeOutlined,
         BulbOutlined,
         FundOutlined,
         MenuOutlined,
         SolutionOutlined,
         LogoutOutlined,
         UserOutlined,
         GlobalOutlined } from '@ant-design/icons/';

import { isAuthenticated, getUserName } from '../utils/auth';

import icon from '../images/coin2.png'
const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);    
        window.addEventListener('resize', handleResize);    
        handleResize();    
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      useEffect(() => {
        if (screenSize <= 800) {setActiveMenu(false);}
         else {setActiveMenu(true);}
      }, [screenSize]);


  return (
    <div className="nav-container">
        <div className="logo-container">
            <Avatar src={icon} size="large" />
            <Typography.Title level={2} className="logo">
                <Link to='/'>CryptoWorld</Link>
            </Typography.Title>
            <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                <MenuOutlined />
            </Button>
            </div>
            {activeMenu && ( isAuthenticated() === true ? (
            <Menu theme="dark">
                <Menu.Item icon={<HomeOutlined />}>
                    <Link to="/"> Home  </Link>
                </Menu.Item>

                <Menu.Item icon={<GlobalOutlined />}>
                    <Link to="/cryptocurrencies"> Cryptocurriencies </Link>
                </Menu.Item>

                <Menu.Item icon={<FundOutlined  />}>
                    <Link to="/prediction"> Prediction </Link>
                </Menu.Item>

                <Menu.Item icon={<BulbOutlined />}>
                    <Link to="/news"> News </Link>
                </Menu.Item>

                <Divider dashed style={{'background-color':'grey'}}/>
                
                <Menu.Item icon={<UserOutlined />} style={{ pointerEvents: 'none' }}>
                    user: {getUserName()}
                </Menu.Item>
                <Menu.Item icon={<LogoutOutlined />}>
                    <Link to="/logout"> Log out </Link>
                </Menu.Item>
                
            </Menu>  
            ) : (
                <Menu theme="dark">
                <Menu.Item icon={<SolutionOutlined />}>
                    <Link to="/login"> LogIn / SignIn </Link>
                </Menu.Item>
                
            </Menu>  
            )
            )}      
    </div>
  )
}

export default Navbar