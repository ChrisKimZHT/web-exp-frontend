import React from 'react';
import PageRouter from './router/PageRouter';
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Navbar from './component/Navbar';
import SideMenu from './component/SideMenu';

const App = () => {
  const headerStyle = {
    padding: "0",
    backgroundColor: "rgba(255, 255, 255, 0)",
    zIndex: "1000",
  }

  return (
    <div className='app'>
      <Layout>
        <Header style={headerStyle}>
          <Navbar />
        </Header>
        <Layout>
          <Sider width="256px" style={{ backgroundColor: "white" }}>
            <SideMenu />
          </Sider>
          <Content style={{ minHeight: "90vh" }}>
            <PageRouter />
          </Content>
        </Layout>
        <Footer>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;