import React, { useState } from 'react';
import './UserView.scss';
import { CheckCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { App, Avatar, Button, Input, Upload } from 'antd';
import service from '../service/service';

const UserView = () => {
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState('');

  const { message } = App.useApp();

  const resetStatus = () => {
    setEmailStatus('');
    setPasswordStatus('');
    setConfirmPasswordStatus('');
  }

  const onAvatarChange = (info) => {
    if (info.file.status === 'done') {
      setAvatar(info.file.response.avatar);
    }
  }

  const handleRegister = () => {
    if (!email) {
      setEmailStatus('error');
      message.error('请输入邮箱');
      return;
    }
    if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email) === false) {
      setEmailStatus('error');
      message.error('邮箱格式错误');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordStatus('error');
      setConfirmPasswordStatus('error');
      message.error('两次密码不一致');
      return;
    }

    service.user.update(email, password, avatar).then(() => {
      message.success('更新成功');
      setTimeout(() => {
        localStorage.clear();
        window.location.reload();
      }, 1000);
    }).catch(err => {
      message.error(`${err}`);
    });
  }

  return (
    <div className='user-view'>
      <div className='title'>
        <UserOutlined /> 个人中心
      </div>
      <div className='content'>
        <div className='avatar-area'>
          <div className='label'>头像</div>
          <div className='avatar-upload'>
            <Avatar className='avatar' size={160} src={`${window.baseURL}upload/${avatar}`} />
            <Upload
              className='upload'
              action={`${window.baseURL}user/uploadAvatar`}
              onChange={onAvatarChange}
              showUploadList={false}
              name='avatar'
            >
              <Button icon={<UploadOutlined />} shape='circle'></Button>
            </Upload>
          </div>
        </div>
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
          确认修改
        </Button>
      </div>
    </div>
  );
}

export default UserView;