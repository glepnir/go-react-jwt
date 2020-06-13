import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@store/reducer';
import { loginRequest } from '@store/action';

const FormItem = Form.Item;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const handleSubmit = (values: any) => {
    setLoading(true);
    const { username, password } = values;
    dispatch(loginRequest(username, password));
    if (isAuthenticated) {
      history.push('/home');
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
