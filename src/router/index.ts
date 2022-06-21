import type { Router } from 'vue-router';
// import type { RouteRecordRaw, Router } from 'vue-router';
import type { App } from 'vue';

export function setupRouter(app: App<Element>, router: Router) {
  app.use(router)
}