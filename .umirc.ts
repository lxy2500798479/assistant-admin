import { defineConfig } from '@umijs/max';
import { resolve } from 'node:dns';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {

  },
  layout: false,

  routes: [
    {
      path: '/login',
      component: 'Login/index',
    },
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      access: 'isLoggedIn',
      routes: [
        {
          path: '/',
          redirect: '/dashboard',
        },
        {
          path: '/dashboard',
          component: 'Dashboard/index',
        },
        {
          path: '/user',
          component: 'User/index',
          routes: [
            {
              path: '/user',
              redirect: '/user/management',
            },
            {
              path: '/user/management',
              component: './User/components/UserManagement',
              title: '用户管理',
            },
            {
              path: '/user/level',
              component: './User/components/LevelManagement',
              title: '等级管理',
            },
            {
              path: '/user/settings',
              component: './User/components/UserSettings',
              title: '用户设置',
            },
          ],
        },
        {
          path: '/settings',
          component: 'Settings/index',
        }
      ],
    },
  ],



  npmClient: 'pnpm',
  tailwindcss: {},
});
