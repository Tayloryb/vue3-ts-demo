import type { AppRouteRecordRaw } from '/@/router/types'
const UserRoutes: AppRouteRecordRaw = {
  path: 'home',
  name: 'Home',
  component: () => import('/@/views/pages/index/index.vue'),
  meta: {
    title: 'HomePage'
  },
  children: []
}

export default UserRoutes