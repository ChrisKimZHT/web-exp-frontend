import React, { useEffect, useState } from 'react';
import './HomeView.scss';
import { Calendar, Col, Row, Card } from 'antd';
import { CalendarOutlined, SnippetsOutlined } from '@ant-design/icons';
import service from '../service/service';

const HomeView = () => {
  const [noteList, setNoteList] = useState([]);

  const refreshNoteData = () => { 
    service.note.list().then(res => {
      const originalData = res.data.data;
      const filteredData = originalData.filter(note => note.isStared);
      setNoteList(filteredData);
    });
  }

  useEffect(() => {
    refreshNoteData();
  }, []);

  return (
    <div className='home-view'>
      <Row className='row'>
        <Col lg={16} xs={24} className='col'>
          <div className='title'>
            <CalendarOutlined /> 待办事项
          </div>
          <div className='calender-container'>
            <Calendar />
          </div>
        </Col>
        <Col lg={8} xs={24} className='col right'>
          <div className='title'>
            <SnippetsOutlined /> 便签
          </div>
          <div className='note-container'>
            {noteList.map((note, index) => (
              <Card title={note.title} className='note-card' bordered hoverable>
                {note.content}
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HomeView;