import React from 'react';
import { useNavigate, useLocation } from '@umijs/max'; // 1. 导入 useLocation

// 定义菜单项的数据结构
export interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}

// 定义组件的 props 类型
interface MenuListProps {
  items: MenuItem[];
}

const MenuList: React.FC<MenuListProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 2. 获取当前路由信息

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col p-2">
      {items.map((item) => {
        // 3. 判断当前菜单项是否是激活状态
        const isActive = location.pathname === item.path;

        return (
          <div
            key={item.key}
            // 4. 根据 isActive 的值动态添加 CSS 类
            className={`
              flex flex-col justify-center items-center w-full p-3 cursor-pointer rounded-md mb-2 last:mb-0 transition-colors duration-200
              ${isActive
              ? 'bg-blue-600 text-white' // 选中时的样式
              : 'text-gray-600 hover:bg-gray-200' // 未选中时的默认和悬浮样式 (假设在浅色背景下)
            }
            `}
            onClick={() => handleItemClick(item.path)}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium mt-1">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MenuList;
