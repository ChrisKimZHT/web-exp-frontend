import React, { useState } from 'react';
import './SiderLayout.scss';
import Layout, { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import SideMenu from './SideMenu';

const SiderLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const contentStyle = () => {
    if (collapsed) {
      return {
        marginLeft: '80px',
        transition: 'margin-left 0.2s'
      };
    } else {
      return {
        marginLeft: '200px',
        transition: 'margin-left 0.2s'
      };
    }
  }

  return (
    <Layout className='sider-layout'>
      <Sider
        className='sider'
        theme='light'
        collapsible
        breakpoint='lg'
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <SideMenu />
      </Sider>
      <Content className='content' style={contentStyle()}>
        {children}
      </Content>
    </Layout>
  );
}

export default SiderLayout;