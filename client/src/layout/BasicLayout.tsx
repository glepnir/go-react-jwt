import React from 'react';
import { Layout } from 'antd';
import LayoutHeader from '@components/LayoutHeader';
import LayoutFooter from '@components/LayoutFooter';
import LayoutSider from '@components/LayoutSider';
import './style.scss';

const { Content } = Layout;
const BasicLayout: React.FC = () => {
  return (
    <Layout className="page-basic">
      <LayoutSider> LayoutSider </LayoutSider>
      <Layout>
        <LayoutHeader />
        <Content />
        <LayoutFooter />
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
