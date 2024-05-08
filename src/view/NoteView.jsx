import React, { useEffect, useState } from 'react';
import { App, Form, Table, Typography, Popconfirm, Button } from 'antd';
import './NoteView.scss';
import dayjs from 'dayjs';
import { PlusCircleOutlined, RedoOutlined, SnippetsOutlined, StarOutlined, StarTwoTone } from '@ant-design/icons';
import service from '../service/service';
import EditableCell from '../component/EditableCell';

const NoteView = () => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const { message } = App.useApp();

  const editRow = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.noteId);
  };

  const saveRow = (record) => {
    form.validateFields().then(values => {
      const { title, content, isStared } = values;
      service.note.update(record.noteId, title, content, record.date, isStared).then(res => {
        message.success('保存成功');
        setEditingKey('');
        refreshData();
      }).catch(err => {
        message.error('保存失败');
      })
    }).catch(err => {
      message.error('请填写完整信息');
    })
  }

  const deleteRow = (noteId) => {
    service.note.delete(noteId).then(res => {
      message.success('删除成功');
      refreshData();
    }).catch(err => {
      message.error('删除失败');
    })
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'noteId',
      key: 'noteId',
      width: 60,
      align: 'center',
    },
    {
      title: '星标',
      dataIndex: 'isStared',
      key: 'isStared',
      render: (isStared) => isStared ? <StarTwoTone /> : <StarOutlined />,
      width: 70,
      align: 'center',
      editable: true,
      editType: 'boolean'
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      editable: true,
      editType: 'text'
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      editable: true,
      editType: 'text'
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      key: 'date',
      render: (time) => dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss'),
      width: 160
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return record.noteId === editingKey ? (
          <span>
            <Typography.Link
              onClick={() => saveRow(record)}
              style={{ marginRight: 8 }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="确认放弃更改？" onConfirm={() => setEditingKey('')}>
              {/* eslint-disable-next-line */}
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => editRow(record)}
              style={{ marginRight: 8 }}
            >
              编辑
            </Typography.Link>
            <Popconfirm title="确认删除？" disabled={editingKey !== ''} onConfirm={() => deleteRow(record.noteId)}>
              {/* eslint-disable-next-line */}
              <a disabled={editingKey !== ''} style={{ color: editingKey === '' ? 'red' : null }}>
                删除
              </a>
            </Popconfirm>
          </span>
        );
      },
      width: 100
    },
  ]

  const refreshData = () => {
    setIsLoading(true);
    service.note.list().then(res => {
      const originalData = res.data.data.reverse();
      const data = originalData.map((item, index) => {
        const { noteId, title, content, date, isStared } = item;
        return {
          key: index + 1,
          noteId,
          title,
          content,
          date,
          isStared
        }
      })
      setTableData(data);
      setIsLoading(false);
    }).catch(err => {
      message.error('获取便签列表失败');
    })
  }

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.editType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: record.noteId === editingKey,
      }),
    };
  });

  const createNewNote = () => {
    service.note.create("", "").then(res => {
      message.success('创建成功');
      refreshData();
      editRow({
        noteId: res.data.noteId,
        title: '',
        content: '',
        date: 0,
        isStared: false
      });
    }).catch(err => {
      message.error('创建失败');
    })
  }

  // eslint-disable-next-line
  useEffect(() => { refreshData() }, [])

  return (
    <div className='note-view'>
      <div className='headline'>
        <div className='title'>
          <SnippetsOutlined /> 便签
        </div>
        <div className='btns'>
          <Button
            className='btn'
            type='primary'
            shape='circle'
            size='large'
            onClick={refreshData}
            icon={<RedoOutlined />}
            disabled={editingKey !== ''}
          />
          <Button
            className='btn'
            type='primary'
            shape='circle'
            size='large'
            onClick={createNewNote}
            icon={<PlusCircleOutlined />}
            disabled={editingKey !== ''}
          />
        </div>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          loading={isLoading}
          columns={mergedColumns}
          dataSource={tableData}
          bordered={true}
          pagination={{
            position: ["bottomCenter"],
            onChange: () => { setEditingKey('') },
          }}
        />
      </Form>
    </div>
  );
}

export default NoteView;