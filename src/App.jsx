import React, { useState } from 'react';
import './App.scss';
import PageRouter from './router/PageRouter';
import Layout, { Header } from 'antd/es/layout/layout';
import Navbar from './component/Navbar';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { checkToken } from './util/checkToken';
import { useLocation } from 'react-router-dom';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { darkAlgorithm } = theme;
  const { pathname } = useLocation();

  checkToken().then((status) => {
    if (status === true) {
      return;
    }
    if (['/login', '/register', '/forget-password'].includes(pathname) === false) {
      window.location.href = '/login';
    }
  });

  return (
    <ConfigProvider locale={zhCN} theme={{
      algorithm: isDarkTheme ? [darkAlgorithm] : null,
      cssVar: true
    }}>
      <div className='app'>
        <Layout>
          <Header className='header'>
            <Navbar
              isDarkTheme={isDarkTheme}
              setIsDarkTheme={setIsDarkTheme}
            />
          </Header>
          <PageRouter />
        </Layout>
      </div>
    </ConfigProvider>
  );
}

export default App;