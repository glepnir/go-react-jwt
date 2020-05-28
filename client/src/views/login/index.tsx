import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import useInput from '../../hooks/useInput';
import './style.scss';

const FormItem = Form.Item;

const Login: React.FC = () => {
  const username = useInput('');
  const password = useInput('');
  const [loading, setLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleSubmit = () => {
    const loginame = username.val.trim();
    const loginpassword = password.val.trim();
    try {
      setLoading(true);
      if (loginame) throw new Error('The Username cannot empty');
      if (loginpassword) throw new Error('The PassWord cannot empty');
      message.success('test');
      setLoading(false);
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="login-page">
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <p className="login-title"> Go React</p>
        <FormItem
          name="username"
          validateStatus="error"
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
          <Button
            htmlType="submit"
            onClick={handleSubmit}
            type="primary"
            className="login-button"
          >
            <Spin indicator={antIcon} spinning={loading} />
            {loading ? ' Logging in' : ' Login'}
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default Login;
