import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeView from '../view/HomeView';

const PageRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeView />} />
    </Routes>
  );
}

export default PageRouter;