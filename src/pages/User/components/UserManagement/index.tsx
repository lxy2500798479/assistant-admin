import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import {
  deleteCustomer,
  getCustomers,
  updateCustomer, // 引入更新用户的 API
} from '@/services/customer';
import { Customer, CustomerSearchParams } from '@/services/customer/types';
import { useModel } from '@umijs/max'; // 确保类型已从 types.ts 导出

const UserManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 从全局初始状态中获取当前用户信息

  const { initialState } = useModel('@@initialState');

  const { currentUser } = initialState || {};

  // 从本地存储获取用户信息

  const [localUserInfo, setLocalUserInfo] = useState<any>(null);
  useEffect(() => {
    // 从本地存储获取用户信息

    const userInfoStr = localStorage.getItem('user_info');

    if (userInfoStr) {
      try {
        const userInfo = JSON.parse(userInfoStr);
        setLocalUserInfo(userInfo);
      } catch (error) {
        console.error('解析本地用户信息失败:', error);
      }
    }
  }, []);

  // ✨ 新增 state 用于控制编辑模态框的显示和存储当前行数据
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Customer>();

  const getLevelColor = (levelName: string): string => {
    if (levelName.includes('金')) return 'gold';
    if (levelName.includes('银')) return 'silver';
    if (levelName.includes('黑')) return '#000000';
    if (levelName.includes('基础') || levelName.includes('普通'))
      return '#CD7F32';
    return 'default';
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      message.success('用户删除成功');
      actionRef.current?.reload(); // 刷新表格
    } catch (error) {
      message.error('删除失败');
    }
  };

  // ✨ 处理编辑表单提交的函数
  const handleUpdate = async (values: Record<string, any>) => {
    try {
      // 调用更新接口
      await updateCustomer(currentRow!.id, {
        ...currentRow,
        ...values,
      });
      message.success('更新成功');
      setEditModalVisible(false);
      actionRef.current?.reload();
      return true;
    } catch (error) {
      message.error('更新失败');
      return false;
    }
  };


  const handleTableRequest = async (params: CustomerSearchParams = {}) => {
    // 更新分页状态，以便“序号”列可以正确计算
    setCurrentPage(params.current || 1);
    setPageSize(params.pageSize || 10);

    // ✨ 步骤1: 放弃 for..in 循环，创建一个新的、干净的参数对象
    const processedParams: CustomerSearchParams = {
      current: params.current,
      pageSize: params.pageSize,
    };

    // ✨ 步骤2: 对每个可能的查询参数进行独立、类型安全的处理

    // 处理 nickname (string)
    if (params.nickname) {
      const trimmedValue = params.nickname.trim();
      if (trimmedValue) {
        processedParams.nickname = trimmedValue;
      }
    }

    // 处理 phoneNumber (string)
    if (params.phoneNumber) {
      const trimmedValue = params.phoneNumber.trim();
      if (trimmedValue) {
        processedParams.phoneNumber = trimmedValue;
      }
    }

    // 处理 levelId (number)
    if (params.levelId !== undefined && params.levelId !== null) {
      processedParams.levelId = params.levelId;
    }

    const robotId = currentUser?.id || localUserInfo?.id;

    if (!robotId) {
      message.warning('无法获取用户标识，请稍后重试');
      return { data: [], success: false, total: 0 };
    }

    try {
      // 使用处理后的参数进行 API 调用
      const response = await getCustomers(robotId, processedParams);

      if (response && response.code === 200 && response.data) {
        return {
          data: response.data.list || [],
          total: response.data.total || 0,
          success: true,
        };
      } else {
        message.error(response?.message || '获取数据失败');
        return { data: [], success: false, total: 0 };
      }
    } catch (error) {
      console.error('请求客户列表时发生错误:', error);
      message.error('请求客户列表时发生网络错误');
      return { data: [], success: false, total: 0 };
    }
  };

  const columns: ProColumns<Customer>[] = [
    {
      title: '序号',
      key: 'index',
      width: 48,
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
      search: false,
    },
    { title: '昵称', dataIndex: 'nickname' },
    { title: '电话号码', dataIndex: 'phoneNumber' },
    {
      title: '会员等级',
      dataIndex: ['level', 'levelName'],
      key: 'level',
      search: true,
      render: (_, record) => (
        <Tag color={getLevelColor(record.level.levelName)}>
          {record.level.levelName}
        </Tag>
      ),
    },
    {
      title: '注册日期',
      dataIndex: 'registrationDate',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'action',
      render: (text, record, _, action) => [
        // ✨ 美化编辑按钮
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => {
            setCurrentRow(record);
            setEditModalVisible(true);
          }}
        >
          编辑
        </Button>,
        // ✨ 美化删除按钮
        <Popconfirm
          key="delete"
          title="确定要删除此用户吗?"
          onConfirm={() => handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable<Customer>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={handleTableRequest}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: pageSize }}
        dateFormatter="string"
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false,
        }}

      />

      <ModalForm
        title="编辑用户信息"
        open={editModalVisible}
        onOpenChange={setEditModalVisible}
        initialValues={currentRow}
        onFinish={handleUpdate}
      >
        <ProFormText
          name="nickname"
          label="昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        />
        <ProFormText
          name="phoneNumber"
          label="电话号码"
          rules={[{ required: true, message: '请输入电话号码' }]}
        />
        <ProFormSelect
          name="levelId"
          label="会员等级"
          rules={[{ required: true, message: '请选择会员等级' }]}
          // 注意：这里的选项应该是动态从API获取的。
          // 在没有专门的“获取所有等级”接口前，我们先硬编码一些选项。
          options={[
            { label: '基础会员', value: 1 },
            { label: '银牌会员', value: 2 },
            { label: '金牌会员', value: 3 },
            { label: '黑卡会员', value: 4 },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default UserManagement;
