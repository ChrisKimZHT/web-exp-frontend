import React, { useState } from 'react';
import './ForgetPasswordView.scss';
import { Input, Button, message } from 'antd';
import { CheckCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, UndoOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ForgetPasswordView = () => {
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [verifyCodeStatus, setVerifyCodeStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState('');

  const [messageApi, messageContextHolder] = message.useMessage();

  const resetStatus = () => {
    setEmailStatus('');
    setVerifyCodeStatus('');
    setPasswordStatus('');
    setConfirmPasswordStatus('');
  }

  const handleModify = () => {
    if (!email) {
      setEmailStatus('error');
      messageApi.error('请输入邮箱');
      return;
    }
    if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email) === false) {
      setEmailStatus('error');
      messageApi.error('邮箱格式错误');
      return;
    }
    if (!verifyCode) {
      setVerifyCodeStatus('error');
      messageApi.error('请输入验证码');
      return;
    }
    if (!password) {
      setPasswordStatus('error');
      messageApi.error('请输入密码');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordStatus('error');
      setConfirmPasswordStatus('error');
      messageApi.error('两次密码不一致');
      return;
    }
    messageApi.info(`Auth: ${email}, ${verifyCode}, ${password}, ${confirmPassword}`);
    // TODO
  }

  return (
    <div className='forget-password-view'>
      {messageContextHolder}
      <div className='box'>
        <h1 className='title'><UndoOutlined />&nbsp;忘记密码</h1>
        <p className='description'>忘记密码可在此重置密码</p>
        <hr className='divide' />
        <div className='input-area'>
          <Input
            size='large'
            prefix={<div className='input-label'>邮箱</div>}
            className='input-field'
            value={email}
            onChange={(e) => { setEmail(e.target.value); resetStatus(); }}
            status={emailStatus}
            onKeyDown={(e) => { if (e.key === 'Enter') window.document.getElementById('verify-code').focus(); }}
          />
          <Input
            id='verify-code'
            size='large'
            prefix={<div className='input-label'>验证码</div>}
            className='input-field'
            value={verifyCode}
            onChange={(e) => { setVerifyCode(e.target.value); resetStatus(); }}
            status={verifyCodeStatus}
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
            onKeyDown={(e) => { if (e.key === 'Enter') window.document.getElementById('confirm-password').focus(); }}
          />
          <Input.Password
            id='confirm-password'
            size='large'
            prefix={<div className='input-label'>确认密码</div>}
            className='input-field'
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); resetStatus(); }}
            status={confirmPasswordStatus}
            onKeyDown={(e) => { if (e.key === 'Enter') handleModify(); }}
          />
          <Button className='button' type='primary' onClick={handleModify} size='large'>
            <CheckCircleOutlined />
            重置
          </Button>
        </div>
        <hr className='divide' />
        <div className='buttom-area'>
          <div className='left'>
            <Link to='/forget-password'>忘记密码</Link>
          </div>
          <div className='right'>
            <Link to='/login'>登录账号</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordView;