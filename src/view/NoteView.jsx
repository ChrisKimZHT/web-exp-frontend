import React, { useEffect, useState } from 'react';
import { App, Form, Table, Tag, Typography, Popconfirm, InputNumber, Input, Switch } from 'antd';
import './NoteView.scss';
import dayjs from 'dayjs';
import { SnippetsOutlined } from '@ant-design/icons';
import service from '../service/service';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const nodeMap = {
    'number': <InputNumber />,
    'text': <Input />,
    'boolean': <Switch />
  }
  const inputNode = nodeMap[inputType];
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

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

  const columns = [
    {
      title: '#',
      dataIndex: 'noteId',
      key: 'noteId',
      width: 60
    },
    {
      title: '星标',
      dataIndex: 'isStared',
      key: 'isStared',
      render: (isStared) => isStared ? <Tag color='gold'>已标</Tag> : <Tag>未标</Tag>,
      width: 80,
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
              style={{
                marginRight: 8,
              }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="确认放弃更改？" onConfirm={() => setEditingKey('')}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => editRow(record)}>
            编辑
          </Typography.Link>
        );
      },
    },
  ]

  const refreshData = () => {
    setIsLoading(true);
    service.note.list().then(res => {
      const originalData = res.data.data;
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

  // eslint-disable-next-line
  useEffect(() => { refreshData() }, [])

  return (
    <div className='note-view'>
      <div className='title'>
        <SnippetsOutlined /> 便签
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