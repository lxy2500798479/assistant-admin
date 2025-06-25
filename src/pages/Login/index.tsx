import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel, history } from '@umijs/max';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { login } from '@/services/login';
import { LoginRobotParams } from '@/services/login/types';


const LoginPage: React.FC = () => {
  const [loginError, setLoginError] = useState<string>('');

  const { setInitialState } = useModel('@@initialState');


  const handleSubmit = async (values: LoginRobotParams) => {
    setLoginError(''); // 开始登录前清除之前的错误信息
    try {
      const response = await login(values);
      console.log(response);

      if (response.code === 200) {
        message.success('登录成功！');

        const { token, robotInfo } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user_info', JSON.stringify(robotInfo));


        setInitialState((s) => ({ ...s, currentUser: robotInfo }));

        history.push('/dashboard');
        return;
      }

      // 如果后端返回登录失败 (success: false)
      setLoginError(response.message || '用户名或密码错误！');
    } catch (error) {
      // 处理网络请求等异常
      console.error('登录请求异常:', error);
      setLoginError('登录失败，请检查网络连接或稍后重试');
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-auto bg-gray-100">
      <div className="flex-1 flex justify-center items-center py-8">
        <LoginForm
          title="聊天管理系统"
          subTitle="企业级聊天管理与用户管理平台"
          onFinish={async (values) => {
            // 将表单值断言为正确的类型并提交
            await handleSubmit(values as LoginRobotParams);
          }}
        >
          {/* 登录错误提示 */}
          {loginError && (
            <Alert
              style={{ marginBottom: 24 }}
              message={loginError}
              type="error"
              showIcon
            />
          )}

          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: '用户名是必填项!',
              },
            ]}
          />

          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '密码是必填项!',
              },
            ]}
          />

          <div style={{ marginBottom: 24 }}>
            <ProFormCheckbox noStyle name="remember">
              记住密码
            </ProFormCheckbox>
            <a style={{ float: 'right' }}>忘记密码</a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default LoginPage;
