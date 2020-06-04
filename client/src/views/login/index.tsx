import React, { useState } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import request from '../../utils/request';
import storageUtils from '../../utils/storage';
import './style.scss';
import { receiveUser } from '../../store/action';

const FormItem = Form.Item;

interface LoginFormData {
  username?: string;
  password?: string;
}

interface LoginResponseData {
  code: string;
  token: string;
  msg: string;
}

const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [loading, setLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const dispatch = useDispatch();

  const handleSubmit = async (values: LoginFormData) => {
    try {
      setLoading(true);
      const result = (await request(
        '/api/login',
        values,
        'POST'
      )) as LoginResponseData;
      if (result.code === '1') {
        storageUtils.saveToken(result.token);
        const user = storageUtils.getUser(result.token);
        dispatch(receiveUser(user));
        message.success(result.msg);
        setLoading(false);
        props.history.push('/home');
      } else {
        message.error(result.msg);
        setLoading(false);
      }
    } catch (err) {
      message.error(err.message);
    }
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
            <Spin indicator={antIcon} spinning={loading} />
            {loading ? ' Logging in' : ' Login'}
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default Login;
