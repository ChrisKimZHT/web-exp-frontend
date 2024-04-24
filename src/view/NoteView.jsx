import React, { useState } from 'react';
import { Button, Table } from 'antd';
import './NoteView.scss';
import dayjs from 'dayjs';
import { SnippetsOutlined } from '@ant-design/icons';

const sampleData = [
  {
    no: 1,
    title: '标题1',
    content: '内容1',
    time: 1630416000
  },
  {
    no: 2,
    title: '标题2',
    content: '内容2',
    time: 1630416000
  },
  {
    no: 3,
    title: '标题3',
    content: '内容3',
    time: 1630416000
  },
  {
    no: 4,
    title: '标题4',
    content: '内容4',
    time: 1630416000
  },
  {
    no: 5,
    title: '标题5',
    content: '内容5',
    time: 1630416000
  },
  {
    no: 6,
    title: '标题6',
    content: '内容6',
    time: 1630416000
  },
  {
    no: 7,
    title: '标题7',
    content: '内容7',
    time: 1630416000
  },
  {
    no: 8,
    title: '标题8',
    content: '内容8',
    time: 1630416000
  },
  {
    no: 9,
    title: '标题9',
    content: '内容9',
    time: 1630416000
  },
  {
    no: 10,
    title: '标题10',
    content: '内容10',
    time: 1630416000
  },
  {
    no: 11,
    title: '标题11',
    content: '内容11',
    time: 1630416000
  },
  {
    no: 12,
    title: '标题12',
    content: '内容12',
    time: 1630416000
  },
  {
    no: 13,
    title: '标题13',
    content: '内容13',
    time: 1630416000
  },
  {
    no: 14,
    title: '标题14',
    content: '内容14',
    time: 1630416000
  },
  {
    no: 15,
    title: '标题15',
    content: '内容15',
    time: 1630416000
  },
  {
    no: 16,
    title: '标题16',
    content: '内容16',
    time: 1630416000
  },
  {
    no: 17,
    title: '标题17',
    content: '内容17',
    time: 1630416000
  },
  {
    no: 18,
    title: '标题18',
    content: '内容18',
    time: 1630416000
  },
  {
    no: 19,
    title: '标题19',
    content: '内容19',
    time: 1630416000
  },
  {
    no: 20,
    title: '标题20',
    content: '内容20',
    time: 1630416000
  },
  {
    no: 21,
    title: '标题21',
    content: '内容21',
    time: 1630416000
  },
  {
    no: 22,
    title: '标题22',
    content: '内容22',
    time: 1630416000
  },
  {
    no: 23,
    title: '标题23',
    content: '内容23',
    time: 1630416000
  },
  {
    no: 24,
    title: '标题24',
    content: '内容24',
    time: 1630416000
  },
  {
    no: 25,
    title: '标题25',
    content: '内容25',
    time: 1630416000
  },
]


const NoteView = () => {
  const [tableData, setTableData] = useState(sampleData)

  const columns = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      width: 100
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
      render: (time) => dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss'),
      width: 160
    },
    {
      title: '操作',
      key: 'action',
      render: (record) => (
        <Button size='small' danger={true} onClick={() => { console.log(record["no"]) }}>
          删除
        </Button>
      ),
    },
  ]

  return (
    <div className='note-view'>
      <div className='title'>
        <SnippetsOutlined /> 便签
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        bordered={true}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
}

export default NoteView;