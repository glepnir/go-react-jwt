import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="系统提示：您访问的页面不存在，请检查后重新使用"
      extra={
        <Button type="primary">
          <Link to="/home">返回首页</Link>
        </Button>
      }
    />
  );
}

export default NotFound;
