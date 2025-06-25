
import { RobotInfo } from '@/services/login/types';
import { RequestConfig } from '@@/plugin-request/request';
import { history } from '@umijs/max'; // It's good practice to import from @umijs/max

// 定义登录页面的路径
const loginPath = '/login';


export async function getInitialState(): Promise<{
  currentUser?: RobotInfo;
}> {
  const userInfoStr = localStorage.getItem('user_info');
  const currentUser = userInfoStr ? (JSON.parse(userInfoStr) as RobotInfo) : undefined;


  if (!currentUser && history.location.pathname !== loginPath) {
    history.push(loginPath);
  }


  return { currentUser };
}

// 导出请求配置
export const request: RequestConfig = {
  // 1. 设置基础路径
  baseURL: 'http://localhost:3000/api/v1', // 你的 API 服务器地址

  // 2. 统一处理后端错误
  errorConfig: {
    errorHandler(error: any) {
      // 这里可以统一处理请求错误，例如弹出一个消息提示
      console.error('Request error:', error);
      // message.error('请求失败，请稍后重试！');
    },
  },

  // 3. 还可以添加请求拦截器，例如统一添加 token
  requestInterceptors: [
    (url, options) => {
      const token = localStorage.getItem('token');
      const authHeader = { Authorization: `${token}` };
      return {
        url: url,
        options: { ...options, interceptors: true, headers: authHeader },
      };
    },
  ],
};
