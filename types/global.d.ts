import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType,
} from 'vue';

import glob from "glob"

// => 全局类型声明
declare global {
  interface Window {
    _hmt: any;
    wx: any;
    AlipayJSBridge: any;
    vApp: any;
  }
  namespace GD {
    const __APP_INFO__: {
      pkg: {
        name: string;
        version: string;
        dependencies: Recordable<string>;
        devDependencies: Recordable<string>;
      };
      lastBuildTime: string;
    };
    // declare interface BaseResponse<T = any> {
    //   code: number;
    //   data: T;
    //   msg: string;
    //   page: {
    //     pageNo: number;
    //     pageSize: number;
    //     pages: number;
    //     total: number;
    //   };
    // }

  }

  namespace glob {
    glob
  }
  
  declare type Nullable<T> = T | null;

  declare type Recordable<T = any> = Record<string, T>;

  declare interface ViteEnv {
    VITE_PORT: number;
    VITE_USE_MOCK: boolean;
    VITE_USE_PWA: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_APP_SHORT_NAME: string;
    VITE_USE_CDN: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_LEGACY: boolean;
    VITE_USE_IMAGEMIN: boolean;
    VITE_GENERATE_UI: string;
  }
}
