import React from 'react';
import { Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss';

const Login: React.FC = () => {
  const handleSubmit = () => {
    message.success('test');
  };
  return (
    <div className="login-page">
      <p> Go With React </p>
      <Input
        prefix={<UserOutlined />}
        size="large"
        placeholder="Please input username"
      />
      <Input
        prefix={<LockOutlined />}
        size="large"
        placeholder="Please input password"
        type="password"
      />
      <Button size="large" type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default Login;
