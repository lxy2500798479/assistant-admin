import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Menu, Layout } from 'antd';
import { UserOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from '@umijs/max';

const { Sider, Content } = Layout;

// 定义子菜单项
const menuItems = [
  {
    key: '/user/management',
    icon: <UserOutlined />,
    label: '用户管理',
  },
  {
    key: '/user/level',
    icon: <StarOutlined />,
    label: '等级管理',
  },
  {
    key: '/user/settings',
    icon: <SettingOutlined />,
    label: '用户设置',
  },
];

const UserPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedKey = location.pathname;

  // 处理菜单选择
  const handleMenuSelect = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <div>
      <Layout className="bg-white rounded-lg overflow-hidden" style={{ minHeight: 'calc(100vh - 180px)' }}>
        <Sider width={200} className="bg-gray-50" theme="light">
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onSelect={handleMenuSelect}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Content className="p-6">
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
};

export default UserPage;