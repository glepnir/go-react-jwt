import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom';
import request from '../../utils/request';
import './style.scss';

const FormItem = Form.Item;

interface Iprops extends RouteComponentProps {}

interface LoginFormData {
  username?: string;
  password?: string;
}

interface LoginResponseData {
  code: string;
  token: string;
  msg: string;
}

const Login: React.FC<Iprops> = (props: Iprops) => {
  const [loading, setLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleSubmit = async (values: LoginFormData) => {
    try {
      setLoading(true);
      const data = (await request(
        '/api/login',
        values,
        'POST'
      )) as LoginResponseData;
      message.success(data.msg);
      setLoading(false);
      props.history.push('/home');
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="login-page">
      <Form name="login" className="login-form" onFinish={handleSubmit}>
        <p className="login-title"> Go React</p>
        <FormItem
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </FormItem>

        <FormItem
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </FormItem>

        <FormItem>
          <Button htmlType="submit" type="primary" className="login-button">
            <Spin indicator={antIcon} spinning={loading} />
            {loading ? ' Logging in' : ' Login'}
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default Login;
