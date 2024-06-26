import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Popover } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined, FormOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import './Navbar.scss';

const Navbar = ({ isDarkTheme, setIsDarkTheme }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const themeDisablePath = ['/login', '/register', '/forget-password'];

  const onLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  const userPopoverContent = (
    <div className='navbar-user-popover'>
      {localStorage.getItem('token') === null ? (
        <>
          <div className='item clickable' onClick={() => navigate('/login')}><LoginOutlined />&nbsp;登录</div>
          <div className='item clickable' onClick={() => navigate('/register')}><FormOutlined />&nbsp;注册</div>
        </>
      ) : (
        <>
          <div className='item'>{localStorage.getItem('email').length > 9 ? localStorage.getItem('email').substring(0, 9) + "..." : localStorage.getItem('email')}</div>
          <div className='item clickable' onClick={() => navigate("/user")}><UserOutlined />&nbsp;个人中心</div>
          <div className='item clickable' onClick={onLogout}><LogoutOutlined />&nbsp;退出登录</div>
        </>
      )}
    </div>
  );

  const navExtraStyle = {
    backgroundColor: "var(--ant-color-bg-container)",
    borderBottom: "#ddd 1px solid",
  };

  const getAvatarURL = () => {
    const avatar = localStorage.getItem("avatar");
    if (avatar === null) {
      return null;
    }
    return `${window.baseURL}upload/${avatar}`;
  }

  useEffect(() => {
    if (themeDisablePath.includes(pathname)) {
      setIsDarkTheme(false);
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <div className='navbar' style={navExtraStyle}>
      <div className='left'>
        <img className='icon' src="/favicon.png" alt="待办事项" />
        <Link to="/" className='title small-hide'>
          <span style={{ color: "var(--ant-color-text-base)" }} className='title-span'>待办事项</span>
        </Link>
      </div>
      <div className='right'>
        {themeDisablePath.includes(pathname) ? null : (
          <div className='theme-btn' onClick={() => setIsDarkTheme(!isDarkTheme)}>
            {isDarkTheme ? <MoonOutlined className='icon' /> : <SunOutlined className='icon' />}
          </div>
        )}
        <Popover content={userPopoverContent}>
          <Avatar size={40} src={getAvatarURL()}><UserOutlined /></Avatar>
        </Popover>
      </div>
    </div>
  );
}

export default Navbar;