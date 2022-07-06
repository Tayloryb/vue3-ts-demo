import type { AppRouteRecordRaw } from '/@/router/types';
const UserRoutes: AppRouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: () => import('/@/views/pages/user/index.vue'),
  meta: {
    title: '用户'
  },
  children: []
}

export default UserRoutes