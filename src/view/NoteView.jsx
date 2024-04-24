import React, { useState } from 'react';
import { Button, Table, Tag } from 'antd';
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
  }
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