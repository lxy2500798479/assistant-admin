import { request } from '@umijs/max';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 获取所有客户
export async function getCustomers() {
  return request<{ data: Customer[] }>('/customers');
}

// 获取单个客户
export async function getCustomerById(id: string) {
  return request<{ data: Customer }>(`/customers/${id}`);
}

// 创建客户
export async function createCustomer(data: Omit<Customer, 'id'>) {
  return request<{ data: Customer }>('/customers', {
    method: 'POST',
    data,
  });
}

// 更新客户
export async function updateCustomer(id: string, data: Partial<Customer>) {
  return request<{ data: Customer }>(`/customers/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除客户
export async function deleteCustomer(id: string) {
  return request<{ success: boolean }>(`/customers/${id}`, {
    method: 'DELETE',
  });
}