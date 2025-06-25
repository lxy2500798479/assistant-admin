import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet } from '@umijs/max';
import { Layout } from 'antd';
import React from 'react';
// 假设 MenuList 组件在 src/components/MenuList/index.tsx
import MenuList, { MenuItem } from './components/MenuList/MenuList';
import AvatarDropdown from '@/components/AvatarDropdown';
import GlobalHeader from '@/layouts/components/GlobalHeader';

const { Sider, Content } = Layout;

// 将菜单数据提出来，方便管理
const menuItems: MenuItem[] = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: '首页',
    path: '/dashboard',
  },
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: '用户管理',
    path: '/user',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '系统设置',
    path: '/settings',
  },
];

const BasicLayout: React.FC = () => {
  return (
    <Layout style={{ maxHeight: '100vh' }}>
      <Sider
        width={90}
        theme="dark"
        className="overflow-auto h-screen  top-0 left-0  transition-none"
        style={{backgroundColor:'#F2F3F8'}}
      >
        <div className="h-8 m-4 flex items-center justify-center rounded-md bg-white/20 text-base font-bold text-white">
          <span><img src={'https://pic1.imgdb.cn/item/685a647258cb8da5c86b5448.png'} alt={'wqw'} /></span>
        </div>

        <MenuList items={menuItems} />
      </Sider>

      <Layout className="overflow-auto">

        <GlobalHeader />

        <Content className=" flex flex-col">
          <div className="  flex-1">
            <Outlet />
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default BasicLayout;
