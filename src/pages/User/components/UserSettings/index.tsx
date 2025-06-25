import React, { useState } from 'react';
import { Card, Form, Input, Button, Switch, Radio, Select, message, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const UserSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // 模拟API调用
      setTimeout(() => {
        console.log('提交的设置:', values);
        message.success('设置保存成功');
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('表单提交错误:', error);
    }
  };

  return (
    <div className="max-w-3xl">
      <Card title="用户系统设置" bordered={false}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            registrationEnabled: true,
            defaultRole: 'user',
            passwordPolicy: 'medium',
            sessionTimeout: 30,
            loginAttempts: 5,
            emailVerification: true,
            usernamePrefixes: ['user', 'member'],
          }}
        >
          <Divider orientation="left">注册设置</Divider>

          <Form.Item
            name="registrationEnabled"
            label="允许新用户注册"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="defaultRole"
            label="默认用户角色"
          >
            <Select>
              <Select.Option value="user">普通用户</Select.Option>
              <Select.Option value="vip">VIP用户</Select.Option>
              <Select.Option value="guest">访客</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="emailVerification"
            label="需要邮箱验证"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Divider orientation="left">安全设置</Divider>

          <Form.Item
            name="passwordPolicy"
            label="密码策略"
          >
            <Radio.Group>
              <Radio value="low">低 (仅字母)</Radio>
              <Radio value="medium">中 (字母+数字)</Radio>
              <Radio value="high">高 (字母+数字+特殊字符)</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="sessionTimeout"
            label="会话超时时间(分钟)"
          >
            <Select>
              <Select.Option value={15}>15分钟</Select.Option>
              <Select.Option value={30}>30分钟</Select.Option>
              <Select.Option value={60}>1小时</Select.Option>
              <Select.Option value={120}>2小时</Select.Option>
              <Select.Option value={1440}>1天</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="loginAttempts"
            label="最大登录尝试次数"
          >
            <Select>
              <Select.Option value={3}>3次</Select.Option>
              <Select.Option value={5}>5次</Select.Option>
              <Select.Option value={10}>10次</Select.Option>
            </Select>
          </Form.Item>

          <Divider orientation="left">高级设置</Divider>

          <Form.Item
            name="usernamePrefixes"
            label="用户名前缀(可多选)"
            rules={[{ required: true, message: '请至少选择一个前缀' }]}
          >
            <Select mode="tags" placeholder="请输入或选择前缀">
              <Select.Option value="user">user</Select.Option>
              <Select.Option value="member">member</Select.Option>
              <Select.Option value="guest">guest</Select.Option>
              <Select.Option value="admin">admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSubmit}
              loading={loading}
            >
              保存设置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserSettings;