import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeView from '../view/HomeView';
import UserView from '../view/UserView';
import LoginView from '../view/LoginView';
import RegisterView from '../view/RegisterView';
import TodoView from '../view/TodoView';

const PageRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeView />} />
      <Route path='/login' element={<LoginView />} />
      <Route path='/register' element={<RegisterView />} />
      <Route path='/todo' element={<TodoView />} />
      <Route path='/user' element={<UserView />} />
    </Routes>
  );
}

export default PageRouter;