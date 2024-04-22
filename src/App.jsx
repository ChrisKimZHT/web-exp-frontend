import React from 'react';
import PageRouter from './router/PageRouter';
import Layout, { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Navbar from './component/Navbar';
import SideMenu from './component/SideMenu';
import { useLocation } from 'react-router-dom';

const App = () => {
  const { pathname } = useLocation();

  const hideSideMenu = () => {
    const includePaths = ['/login', '/register', '/forget-password'];
    for (let path of includePaths) {
      if (pathname.startsWith(path)) {
        return true;
      }
    }
    return false;
  }

  const headerStyle = {
    padding: "0",
    backgroundColor: "rgba(255, 255, 255, 0)",
    zIndex: "1000",
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.querySelector('.ant-layout-sider').style.display = 'block';
    } else {
      document.querySelector('.ant-layout-sider').style.display = 'none';
    }
  });

  return (
    <div className='app'>
      <Layout>
        <Header style={headerStyle}>
          <Navbar />
        </Header>
        <Layout>
          <Sider style={{ backgroundColor: "white" }} hidden={hideSideMenu()}>
            <SideMenu />
          </Sider>
          <Content style={{ minHeight: "90vh" }}>
            <PageRouter />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;