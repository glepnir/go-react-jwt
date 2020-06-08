import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss';
import { loginRequest } from '../../store/action';

const FormItem = Form.Item;

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    loginRequest(username, password);
  };

  return (
    <div className="login-page">
      <Form name="login" className="login-form" onFinish={handleSubmit}>
        <p className="login-title"> Go React</p>
        <FormItem
          name="username"
          rules={[
            { required: true, message: 'Please input your Username!' },
            { min: 4, message: 'min length of username is 4' },
            { max: 12, message: 'max length of username is 12' },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            size="large"
          />
        </FormItem>

        <FormItem
          name="password"
          rules={[
            { required: true, message: 'Please input your Password!' },
            { min: 4, message: 'min length of password is 4' },
            { max: 12, message: 'max length of password is 12' },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large"
          />
        </FormItem>

        <FormItem>
          <Button
            htmlType="submit"
            type="primary"
            className="login-button"
            size="large"
          >
            Login
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default Login;
