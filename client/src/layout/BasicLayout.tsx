import React from 'react';
import { Layout } from 'antd';
import Header from '@components/Header';
import Footer from '@components/Footer';
import './style.scss';

const { Sider, Content } = Layout;
const BasicLayout: React.FC = () => {
  return (
    <Layout className="page-basic">
      <Sider> Sider </Sider>
      <Layout>
        <Header />
        <Content />
        <Footer />
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
