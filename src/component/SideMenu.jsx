import React, { useEffect, useState } from 'react';
import './SideMenu.scss';
import { Menu } from 'antd';
import { CalendarOutlined, HomeOutlined, SnippetsOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  {
    key: '/',
    label: '首页看板',
    icon: <HomeOutlined />
  },
  {
    key: '/note',
    label: '我的便签',
    icon: <SnippetsOutlined />
  },
  {
    key: '/todo',
    label: '代办事项',
    icon: <CalendarOutlined />
  },
  {
    key: '/user',
    label: '个人中心',
    icon: <UserOutlined />
  },
];

const SideMenu = () => {
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  return (
    <div className='side-menu'>
      <Menu
        style={{ width: "200px", height: "100%" }}
        mode="inline"
        items={menuItems}
        selectedKeys={selectedKeys}
        onSelect={({ key }) => { setSelectedKeys([key]); navigate(key); }}
      />
    </div >
  );
}

export default SideMenu;