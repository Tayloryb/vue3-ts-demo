import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

const LoginRoutes: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/pages/login/index.vue'),
  meta: {
    title: '登录'
  }
}

const UserRoutes: AppRouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: () => import('/@/views/pages/user/index.vue'),
  meta: {
    title: '用户'
  }
}

const HomeRoutes: AppRouteRecordRaw= {
  path: '/',
  alias: '/',
  name: 'Home',
  component: () => import('/@/views/pages/index/index.vue'),
  meta: {
    title: 'home'
  }
}

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  component: () => import('/@/views/layout/layout.vue'),
  meta: {
    title: 'Root',
  },
  children: [
    UserRoutes,
    HomeRoutes
  ]
};




export const basicRoutes = [
  RootRoute,
  LoginRoutes
]