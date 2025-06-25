import React from 'react';
import { history, useModel } from '@umijs/max';
import { Avatar, Dropdown, message } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { logout } from '@/services/login'; // 导入登出接口

export interface AvatarDropdownProps {
  className?: string;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ className }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  /**
   * 退出登录，并清空状态
   */
  const loginOut = async () => {
    try {
      // 调用后端登出接口
      const response = await logout();

      // 根据后端响应处理结果
      if (response && response.code === 200) {
        message.success('退出登录成功');
      } else {
        // 即使后端接口失败，也继续前端登出流程
        console.error('登出接口调用失败:', response);
      }
    } catch (error) {
      // 捕获网络错误等异常
      console.error('登出请求异常:', error);
    } finally {
      // 无论后端接口成功与否，都执行前端登出流程

      // 清除本地存储
      localStorage.removeItem('token');
      localStorage.removeItem('user_info');

      // 重置全局状态
      setInitialState((s) => ({ ...s, currentUser: undefined }));

      // 跳转到登录页
      history.replace('/login');
    }
  };

  /**
   * 菜单点击事件处理
   */
  const onMenuClick: MenuProps['onClick'] = (event) => {
    const { key } = event;
    if (key === 'logout') {
      loginOut();
      return;
    }
    // 如果有其他菜单项，可以在这里处理跳转
    history.push(`/user/${key}`);
  };

  // 如果还在加载或者没有用户信息，显示一个占位符
  if (!initialState || !initialState.currentUser) {
    return <span className="text-sm text-gray-500">正在加载...</span>;
  }

  const { currentUser } = initialState;

  // 定义下拉菜单项
  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems, onClick: onMenuClick }} placement="bottomRight">
      <div className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${className}`}>
        <Avatar
          size="small"
          className="mr-2"
          src={currentUser.avatar}
          alt="avatar"
        >
          {currentUser.nickname?.[0]}
        </Avatar>
        <span className="text-sm font-medium text-gray-700">
          {currentUser.nickname}
        </span>
      </div>
    </Dropdown>
  );
};

export default AvatarDropdown;