import { LoginRobotParams, LoginRobotResult } from '@/services/login/types';
import { ApiResponse } from '@/services/types';
import { request } from '@umijs/max';

export async function login(params: LoginRobotParams) {
  return request<ApiResponse<LoginRobotResult>>('/robots/login', {
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return request('/robots/logout', {
    method: 'POST',
  });
}
