import React, { useState } from 'react';
import './LoginView.scss';
import { Input, Button, Row, Col, message } from 'antd';
import { CheckCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, GithubOutlined, LoginOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');

  const [messageApi, messageContextHolder] = message.useMessage();

  const resetStatus = () => {
    setEmailStatus('');
    setPasswordStatus('');
  }

  const handleOauth = (type) => {
    messageApi.info(`OAuth: ${type}`);
    // TODO
  }

  const handleLogin = () => {
    messageApi.info(`Auth: ${email}, ${password}`);
    // TODO
  }

  return (
    <div className='login-view'>
      {messageContextHolder}
      <div className='login-box'>
        <h1 className='title'><LoginOutlined />&nbsp;登录</h1>
        <p className='description'>登录以使用完整功能</p>
        <hr className='divide' />
        <Row className='auth-area'>
          <Col className='oauth' sm={12} xs={24}>
            <div className='oauth-btn github' onClick={() => handleOauth("github")}>
              <GithubOutlined />
              <div className='label'>
                GitHub OAuth
              </div>
            </div>
            <div className='oauth-btn qq' onClick={() => handleOauth("qq")}>
              <QqOutlined />
              <div className='label'>
                QQ 登录
              </div>
            </div>
            <div className='oauth-btn wechat' onClick={() => handleOauth("wechat")}>
              <WechatOutlined />
              <div className='label'>
                微信登录
              </div>
            </div>
          </Col>
          <Col className='password-auth' sm={12} xs={24}>
            <Input
              size='large'
              prefix={<div className='input-label'>邮箱</div>}
              className='input-field'
              value={email}
              onChange={(e) => { setEmail(e.target.value); resetStatus(); }}
              status={emailStatus}
              onKeyDown={(e) => { if (e.key === 'Enter') window.document.getElementById('password').focus(); }}
            />
            <Input.Password
              id='password'
              size='large'
              prefix={<div className='input-label'>密码</div>}
              className='input-field'
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              value={password}
              onChange={(e) => { setPassword(e.target.value); resetStatus(); }}
              status={passwordStatus}
              onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
            />
            <Button className='button' type='primary' onClick={handleLogin} size='large'>
              <CheckCircleOutlined />
              登录
            </Button>
          </Col>
        </Row>
        <hr className='divide' />
        <div className='buttom-area'>
          <div className='left'>
            <Link to='/forgot-password'>忘记密码</Link>
          </div>
          <div className='right'>
            <Link to='/register'>注册账号</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;