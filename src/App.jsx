import React from 'react';
import './App.scss';
import PageRouter from './router/PageRouter';
import Layout, { Header } from 'antd/es/layout/layout';
import Navbar from './component/Navbar';

const App = () => {
  return (
    <div className='app'>
      <Layout>
        <Header className='header'>
          <Navbar />
        </Header>
        <PageRouter />
      </Layout>
    </div>
  );
}

export default App;