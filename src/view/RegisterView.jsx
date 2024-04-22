import React, { useState } from 'react';
import './RegisterView.scss';
import { Input, Button, Row, Col, message, Upload, Avatar } from 'antd';
import { CheckCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, FormOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const RegisterView = () => {
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState('');

  const [messageApi, messageContextHolder] = message.useMessage();

  const resetStatus = () => {
    setEmailStatus('');
    setPasswordStatus('');
    setConfirmPasswordStatus('');
  }

  const onAvatarChange = (info) => {
    messageApi.info(`Avatar: ${info.file.name}`);
    // TODO
  }

  const handleRegister = () => {
    messageApi.info(`Auth: ${email}, ${password}`);
    // TODO
  }

  return (
    <div className='register-view'>
      {messageContextHolder}
      <div className='register-box'>
        <h1 className='title'><FormOutlined />&nbsp;注册</h1>
        <p className='description'>在此注册新账号</p>
        <hr className='divide' />
        <Row className='auth-area'>
          <Col className='left' sm={12} xs={24}>
            <div className='label'>头像</div>
            <div className='avatar-upload'>
              <Avatar className='avatar' size={160} src={avatar} />
              <Upload
                className='upload'
                action={`${window.baseURL}user/uploadAvatar`}
                headers={{ Authorization: localStorage.getItem('token') }}
                onChange={onAvatarChange}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} shape='circle'></Button>
              </Upload>
            </div>
          </Col>
          <Col className='right' sm={12} xs={24}>
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
              onKeyDown={(e) => { if (e.key === 'Enter') window.document.getElementById('confirm-password').focus(); }}
            />
            <Input.Password
              id='confirm-password'
              size='large'
              prefix={<div className='input-label'>确认</div>}
              className='input-field'
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); resetStatus(); }}
              status={confirmPasswordStatus}
              onKeyDown={(e) => { if (e.key === 'Enter') handleRegister(); }}
            />
            <Button className='button' type='primary' onClick={handleRegister} size='large'>
              <CheckCircleOutlined />
              注册
            </Button>
          </Col>
        </Row>
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

export default RegisterView;