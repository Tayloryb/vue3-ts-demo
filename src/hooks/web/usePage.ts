import type { RouteLocationRaw, Router } from 'vue-router';

import { isString } from '/@/utils/is';
import { PageEnum } from '/@/enums/pageEnum';
import { useRouter } from 'vue-router';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };

function handleError(e: Error) {
  console.error(e);
}

// 页面路由跳转
export function useGo(_router?: Router) {
  let router: Router = useRouter();
  // if (!_router) {
  //   router = useRouter();
  // }
  const { push, replace } = _router || router;
  function go(opt: PageEnum | RouteLocationRaw | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return;
    }
    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    } else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }
  return go;
}

// 获取路由对应地址
export function useGetPath(_router?: Router) {
  let router:Router = useRouter();

  const { resolve } = _router || router

  function getPath(opt: RouteLocationRaw) {
    if (!opt) {
      return;
    }
    const pathInfo = resolve(opt) || {}
    if (pathInfo.matched?.length) {
      const path = pathInfo.href || ''
      return `${window.location.pathname}${path}`
    } else {
      return `${window.location.pathname}`
    }
  }

  return getPath
}

export function getCurrentRoute(_router?: Router) {
  let router:Router = useRouter();
  const { currentRoute } =  _router || router;
  return currentRoute.value
}