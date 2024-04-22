import React from 'react';
import './HomeView.scss';
import { Calendar } from 'antd';

const HomeView = () => {
  return (
    <div className='home-view'>
      <div className='title'>
        主页
      </div>
      <div className='calender-container'>
        <Calendar />
      </div>
    </div>
  );
}

export default HomeView;