import React, { useEffect, useRef, useState } from 'react';
import './TodoView.scss';
import { BellTwoTone, CalendarOutlined, CheckCircleOutlined, PlusCircleOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { App, Button, Form, Table, Typography, Popconfirm, Input, Space } from 'antd';
import EditableCell from '../component/EditableCell';
import dayjs from 'dayjs';
import service from '../service/service';


const TodoView = () => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const { message } = App.useApp();

  const [, setSearchText] = useState('');
  const [, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const editRow = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.todoId);
  };

  const saveRow = (record) => {
    form.validateFields().then(values => {
      const { title, detail, begin, end, isFinished } = values;
      service.todo.update(record.todoId, title, detail, begin.unix(), end.unix(), isFinished).then(res => {
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

  const deleteRow = (todoId) => {
    service.todo.delete(todoId).then(res => {
      message.success('删除成功');
      refreshData();
    }).catch(err => {
      message.error('删除失败');
    })
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`搜索 ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            关闭
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: '#',
      dataIndex: 'todoId',
      key: 'todoId',
      width: 60,
      align: 'center',
      ...getColumnSearchProps('todoId')
    },
    {
      title: '状态',
      dataIndex: 'isFinished',
      key: 'isFinished',
      render: (isFinished) => isFinished ? <CheckCircleOutlined /> : <BellTwoTone />,
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
      editType: 'text',
      ...getColumnSearchProps('title')
    },
    {
      title: '内容',
      dataIndex: 'detail',
      key: 'detail',
      editable: true,
      editType: 'text',
      ...getColumnSearchProps('detail')
    },
    {
      title: '开始时间',
      dataIndex: 'begin',
      key: 'begin',
      render: (time) => time.format('YYYY-MM-DD HH:mm'),
      width: 185,
      editable: true,
      editType: 'date'
    },
    {
      title: '结束时间',
      dataIndex: 'end',
      key: 'end',
      render: (time) => time.format('YYYY-MM-DD HH:mm'),
      width: 185,
      editable: true,
      editType: 'date'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return record.todoId === editingKey ? (
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
            <Popconfirm title="确认删除？" disabled={editingKey !== ''} onConfirm={() => deleteRow(record.todoId)}>
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
        editing: record.todoId === editingKey,
      }),
    };
  });

  const refreshData = () => {
    setIsLoading(true);
    service.todo.list().then(res => {
      const originalData = res.data.data.reverse();
      const data = originalData.map((item, index) => {
        const { todoId, isFinished, title, detail, begin, end } = item;
        return {
          key: index + 1,
          todoId,
          isFinished,
          title,
          detail,
          begin: dayjs.unix(begin),
          end: dayjs.unix(end),
        }
      })
      setTableData(data);
      setIsLoading(false);
    }).catch(err => {
      message.error('获取代办事项列表失败');
    });
  }

  const createNewTodo = () => {
    service.todo.create("", "", dayjs.unix(), dayjs.unix()).then(res => {
      message.success('创建成功');
      refreshData();
      editRow({
        todoId: res.data.todoId,
        title: '',
        detail: '',
        begin: dayjs(),
        end: dayjs(),
        isFinished: false
      });
    }).catch(err => {
      message.error('创建失败');
    })
  }

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='todo-view'>
      <div className='headline'>
        <div className='title'>
          <CalendarOutlined /> 代办事项
        </div>
        <div className='btns'>
          <Button
            className='btn'
            type='primary'
            shape='circle'
            size='large'
            icon={<RedoOutlined />}
            onClick={refreshData}
            disabled={editingKey !== ''}
          />
          <Button
            className='btn'
            type='primary'
            shape='circle'
            size='large'
            icon={<PlusCircleOutlined />}
            onClick={createNewTodo}
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

export default TodoView;