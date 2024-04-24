import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeView from '../view/HomeView';
import UserView from '../view/UserView';
import LoginView from '../view/LoginView';
import RegisterView from '../view/RegisterView';
import TodoView from '../view/TodoView';
import ForgetPasswordView from '../view/ForgetPasswordView';
import NoteView from '../view/NoteView';
import SiderLayout from '../component/SiderLayout';

const PageRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<SiderLayout><HomeView /></SiderLayout>} />
      <Route path='/note' element={<SiderLayout><NoteView /></SiderLayout>} />
      <Route path='/todo' element={<SiderLayout><TodoView /></SiderLayout>} />
      <Route path='/user' element={<SiderLayout><UserView /></SiderLayout>} />

      <Route path='/login' element={<LoginView />} />
      <Route path='/register' element={<RegisterView />} />
      <Route path='/forget-password' element={<ForgetPasswordView />} />
    </Routes>
  );
}

export default PageRouter;