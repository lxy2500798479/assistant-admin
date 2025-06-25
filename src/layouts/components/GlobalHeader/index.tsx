import React from 'react';
import { Layout } from 'antd';
import AvatarDropdown from '@/components/AvatarDropdown';

const { Header } = Layout;

const GlobalHeader: React.FC = () => {
  return (
    <Header className="p-0 bg-white border-b border-gray-200">
      <div className="px-6 flex items-center justify-between h-full">
        {/* --- 头部左侧部分 --- */}
        <div className={'flex '}>
          <h2 className="text-xl font-semibold">聚合聊天</h2>

        </div>

        {/* --- 头部右侧部分 --- */}
        <div>
          <AvatarDropdown />
        </div>
      </div>
    </Header>
  );
};

export default GlobalHeader;
