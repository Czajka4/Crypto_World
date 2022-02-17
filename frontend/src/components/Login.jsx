import React, { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { login } from '../utils/auth';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (values) => {
        setError('');
        try {
          const data = await login(values.email, values.password);
    
          if (data) {          
            navigate('/');
          }
        } catch (err) {
          if (err instanceof Error) {
            // handle errors thrown from frontend
            setError(err.message);
          } else {
            // handle errors thrown from backend
            setError(String(err));
          }
        }
      };

  
  return (
    // TODO : Przekierowanie gdy jest sie zalogowanym
    <Form
    name="normal_login"
    className="login-form"
    initialValues={{ remember: true }}
    onFinish={handleSubmit}
  >
    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Please input your Email!' }]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Log in   
      </Button>
       Or  <a href="" onClick={() =>  navigate('/signup')}> Register now! </a>
    </Form.Item>
  </Form>
  )
};

export default Login

