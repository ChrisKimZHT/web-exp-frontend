import { DatePicker, Form, Input, InputNumber, Switch } from 'antd';
import React from 'react';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const nodeMap = {
    'number': <InputNumber />,
    'text': <Input />,
    'boolean': <Switch />,
    'date': <DatePicker showTime showHour showMinute format='YYYY-MM-DD HH:mm' />,
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
              message: `${title}不能为空`,
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

export default EditableCell;