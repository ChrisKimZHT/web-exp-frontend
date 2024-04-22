import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Popover } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => { }

  const userPopoverContent = (
    <div className='navbar-user-popover'>
      {localStorage.getItem('token') === null ? (
        <>
          <div className='item clickable' onClick={() => navigate('/login')}><LoginOutlined />&nbsp;登录</div>
          <div className='item clickable' onClick={() => navigate('/register')}><FormOutlined />&nbsp;注册</div>
        </>
      ) : (
        <>
          <div className='item'>{`${localStorage.getItem('username')} #${localStorage.getItem('userID')}`}</div>
          <div className='item clickable' onClick={onLogout}><LogoutOutlined />&nbsp;退出登录</div>
        </>
      )}
    </div>
  );

  const navExtraStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderBottom: "rgba(238, 238, 238, 0.6) 1px solid",
  };

  return (
    <div className='navbar' style={navExtraStyle}>
      <div className='left'>
        <img className='icon' src="/favicon.png" alt="待办事项" />
        <Link to="/" className='title small-hide'>
          <span style={{ color: "black" }} className='title-span'>待办事项</span>
        </Link>
      </div>
      <div className='right'>
        <Popover content={userPopoverContent}>
          <Avatar size={40} src={localStorage.getItem("avatar")}><UserOutlined /></Avatar>
        </Popover>
      </div>
    </div >
  );
}

export default Navbar;