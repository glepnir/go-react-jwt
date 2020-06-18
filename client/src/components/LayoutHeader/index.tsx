import React from 'react';
import { Layout } from 'antd';
import './style.scss';

const { Header } = Layout;

const LayoutHeader: React.FC = () => {
  return (
    <Header className="site-layout-background header" style={{ padding: 0 }}>
      <div />
    </Header>
  );
};

export default LayoutHeader;
