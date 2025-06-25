// src/services/customer/index.ts

import { request } from '@umijs/max';
import { Customer, CustomerSearchParams } from '@/services/customer/types';
import { ApiResponse } from '@/services/types';




export async function getCustomers(robotId: string, params?: CustomerSearchParams) {
  return request<ApiResponse<{ list: Customer[], total: number }>>(`/customer?robotId=${robotId}`, {
    method: 'POST',
    data: params || {},
  });
}


export async function getCustomerById(id: string) {
  return request<{ code: number; msg: string; data: Customer }>(`/customer/${id}`);
}


export async function createCustomer(data: { nickname: string; phoneNumber: string; }) {
  return request<{ data: Customer }>('/customer', {
    method: 'POST',
    data,
  });
}

// 更新客户
export async function updateCustomer(id: string, data: Partial<Customer>) {
  return request<{ data: Customer }>(`/customer/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除客户
export async function deleteCustomer(id: string) {
  return request<{ success: boolean }>(`/customer/${id}`, {
    method: 'DELETE',
  });
}