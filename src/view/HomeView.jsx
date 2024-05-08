import React, { useEffect, useState } from 'react';
import './HomeView.scss';
import { Calendar, Col, Row, Card, Badge } from 'antd';
import { CalendarOutlined, SnippetsOutlined } from '@ant-design/icons';
import service from '../service/service';
import dayjs from 'dayjs';

const HomeView = () => {
  const [todoData, setTodoData] = useState({});
  const [noteList, setNoteList] = useState([]);

  const refreshTodoData = () => {
    service.todo.list().then(res => {
      const originalData = res.data.data;
      const data = {};
      for (const todo of originalData) {
        const { todoId, title, detail, begin, end, isFinished } = todo;
        const date = dayjs.unix(begin).format('YYYY-MM');
        const day = dayjs.unix(begin).date();
        if (!data[date]) {
          data[date] = [];
        }
        data[date].push({ todoId, title, detail, begin, end, isFinished, day });
      }
      setTodoData(data);
    });
  }

  const refreshNoteData = () => {
    service.note.list().then(res => {
      const originalData = res.data.data;
      const filteredData = originalData.filter(note => note.isStared);
      setNoteList(filteredData);
    });
  }

  const getTodoData = (value, isMonth = false) => {
    const date = value.format('YYYY-MM');
    if (todoData[date]) {
      return isMonth ? todoData[date] : todoData[date].filter(todo => todo.day === value.date());
    } else {
      return [];
    }
  }

  const monthCellRender = (value) => {
    const listData = getTodoData(value, true);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.todoId}>
            <Badge status={item.isFinished ? 'default' : 'processing'} text={item.title} />
          </li>
        ))}
      </ul>
    )
  };

  const dateCellRender = (value) => {
    const listData = getTodoData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.todoId}>
            <Badge status={item.isFinished ? 'default' : 'processing'} text={item.title} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  useEffect(() => {
    refreshNoteData();
    refreshTodoData();
  }, []);

  return (
    <div className='home-view'>
      <Row className='row'>
        <Col lg={16} xs={24} className='col'>
          <div className='title'>
            <CalendarOutlined /> 待办事项
          </div>
          <div className='calender-container'>
            <Calendar cellRender={cellRender} />
          </div>
        </Col>
        <Col lg={8} xs={24} className='col right'>
          <div className='title'>
            <SnippetsOutlined /> 便签
          </div>
          <div className='note-container'>
            {noteList.map((note, index) => (
              <Card title={note.title} key={index} className='note-card' bordered hoverable>
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