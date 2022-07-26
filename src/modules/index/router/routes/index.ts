import type { AppRouteRecordRaw } from '/@/router/types'

import UserRoutes from './userRoutes'
import HomeRoutes from './homeRoutes'

const LoginRoutes: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/pages/login/index.vue'),
  meta: {
    title: '登录'
  }
}

// const HomeRoutes: AppRouteRecordRaw = {
//   path: 'home',
//   name: 'Home',
//   component: () => import('/@/views/pages/index/index.vue'),
//   meta: {
//     title: 'HomePage'
//   }
// }

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  component: () => import('/@/views/layout/basiclayout/BasicLayout.vue'),
  meta: {
    title: 'Root'
  },
  children: [
    UserRoutes,
    HomeRoutes
  ]
}


export const basicRoutes = [
  RootRoute,
  LoginRoutes
]