import React from 'react';
import './HomeView.scss';
import { Calendar, Col, Row } from 'antd';

const HomeView = () => {
  return (
    <div className='home-view'>
      <Row className='row'>
        <Col lg={8} className='col left'>
          <div className='title'>
            便签
          </div>
          <div className='note-container'>
            awa
          </div>
        </Col>
        <Col lg={16} className='col right'>
          <div className='title'>
            待办事项
          </div>
          <div className='calender-container'>
            <Calendar />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HomeView;