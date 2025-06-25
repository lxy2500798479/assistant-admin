import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

// 模拟等级数据
interface Level {
  id: string;
  name: string;
  points: number;
  benefits: string;
}

const LevelManagement: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟获取等级数据
  useEffect(() => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setLevels([
        { id: '1', name: '青铜', points: 100, benefits: '基础功能' },
        { id: '2', name: '白银', points: 500, benefits: '基础功能, 优先客服' },
        { id: '3', name: '黄金', points: 1000, benefits: '全部功能, 优先客服, 专属标识' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // 打开添加等级模态框
  const showAddModal = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 打开编辑等级模态框
  const showEditModal = (record: Level) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingId) {
        // 更新等级
        setLevels(levels.map(level =>
          level.id === editingId ? { ...level, ...values } : level
        ));
        message.success('等级更新成功');
      } else {
        // 添加等级
        const newLevel = {
          id: Date.now().toString(),
          ...values,
        };
        setLevels([...levels, newLevel]);
        message.success('等级添加成功');
      }

      setModalVisible(false);
    } catch (error) {
      console.error('表单提交错误:', error);
    }
  };

  // 处理删除等级
  const handleDelete = (id: string) => {
    setLevels(levels.filter(level => level.id !== id));
    message.success('等级删除成功');
  };

  // 表格列定义
  const columns = [
    {
      title: '等级名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所需积分',
      dataIndex: 'points',
      key: 'points',
      sorter: (a: Level, b: Level) => a.points - b.points,
    },
    {
      title: '权益说明',
      dataIndex: 'benefits',
      key: 'benefits',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Level) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除此等级吗?"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="text" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showAddModal}
        >
          添加等级
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={levels}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingId ? "编辑等级" : "添加等级"}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          name="levelForm"
        >
          <Form.Item
            name="name"
            label="等级名称"
            rules={[{ required: true, message: '请输入等级名称' }]}
          >
            <Input placeholder="请输入等级名称" />
          </Form.Item>

          <Form.Item
            name="points"
            label="所需积分"
            rules={[{ required: true, message: '请输入所需积分' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="请输入所需积分"
            />
          </Form.Item>

          <Form.Item
            name="benefits"
            label="权益说明"
            rules={[{ required: true, message: '请输入权益说明' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入权益说明" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LevelManagement;