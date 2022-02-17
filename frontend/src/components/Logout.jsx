import React from 'react';
import { Form, Button } from 'antd';

import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';


const Logout = () => {
   return (     
    <Form
    name="normal_logout"
    className="logout-form">
      <Form.Item>
        <Button className="logout-button" 
                onClick={() => { logout() } }>
            LOG OUT
        </Button>
      </Form.Item>
    </Form>
  )
};

export default Logout

