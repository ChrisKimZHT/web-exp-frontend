import React from 'react';
import './SiderLayout.scss';
import Layout, { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import SideMenu from './SideMenu';

const SiderLayout = ({ children }) => {
  return (
    <Layout className='sider-layout'>
      <Sider className='sider'>
        <SideMenu />
      </Sider>
      <Content className='content'>
        {children}
      </Content>
    </Layout>
  );
}

export default SiderLayout;