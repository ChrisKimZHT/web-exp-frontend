import React, { useState } from 'react';
import './HomeView.scss';
import { Calendar, Col, Row, Card } from 'antd';
import { CalendarOutlined, SnippetsOutlined } from '@ant-design/icons';

const sampleNoteList = [
  {
    title: '第一条便签',
    content: '这是第一条便签的内容'
  },
  {
    title: '第二条便签',
    content: '这是第二条便签的内容'
  },
  {
    title: '第三条便签',
    content: '这是第三条便签的内容'
  },
  {
    title: '第四条便签',
    content: '这是第四条便签的内容'
  },
  {
    title: '第五条便签',
    content: '这是第五条便签的内容'
  },
  {
    title: '第六条便签',
    content: '这是第六条便签的内容'
  },
  {
    title: '第七条便签',
    content: '这是第七条便签的内容'
  },
  {
    title: '第八条便签',
    content: '这是第八条便签的内容'
  },
  {
    title: '第九条便签',
    content: '这是第九条便签的内容'
  },
  {
    title: '第十条便签',
    content: '这是第十条便签的内容'
  },
]

const HomeView = () => {
  const [noteList, setNoteList] = useState(sampleNoteList)

  return (
    <div className='home-view'>
      <Row className='row'>
        <Col lg={8} className='col left'>
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
        <Col lg={16} className='col right'>
          <div className='title'>
            <CalendarOutlined /> 待办事项
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