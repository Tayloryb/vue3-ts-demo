import axios from 'axios';
import qs from 'qs';
import VApp from './vue.app';

/**
 * 接口数据缓存
 * @type {{set(*=, *=, *, *): (undefined), get(*=, *=): *, expiredTime: number, key(*, *=): string}}
 */
const Cache = {
  /**
   * 默认缓存时间
   */
  cacheTime: 2 * 60,
  /**
   * 计算key值
   * @param url
   * @param params
   * @returns {string}
   */
  key(url, params) {
    return [
      url,
      qs.stringify(params, { skipNulls: true }),
    ].join('');
  },
  /**
   * 获取缓存数据
   * @param url
   * @param params
   * @returns {*}
   */
  get(url, params = '') {
    const key = Cache.key(url, params);
    const cacheData = window.$vApp.store.memory.get(key);
    if (!cacheData) {
      return null;
    }
    // 如果缓存时间不存在，则返回null值,同时移除缓存数据
    if (!Number.isNumeric(cacheData.expiredTime)) {
      window.$vApp.store.memory.remove(key);
      console.warn(`${ key }# cache have no expiredTime , cache data will remove`);
      return null;
    }
    // 如果缓存已过期不存在，则返回null值,同时移除缓存数据
    if (Date.now() > cacheData.expiredTime) {
      window.$vApp.store.memory.remove(key);
      console.warn(`${ key }# cache has been expired , cache data will remove`);
      return null;
    }
    return cacheData.response;
  },
  /**
   * 设置缓存数据
   * @param url       请求地址
   * @param params    请求参数
   * @param cacheTime 单位:秒,-1,最大缓存时间(不推荐使用),大于零
   * @param response      响应数据
   */
  set(url, params, cacheTime, response) {
    let newCacheTime = 0;
    if (cacheTime > 0) {
      newCacheTime = cacheTime;
    } else {
      return;
    }
    const key = Cache.key(url, params);
    const expiredTime = Date.now() + newCacheTime * 1000;
    // console.warn(`${url}# will cache as key:${key}`);
    window.$vApp.store.memory.set(key, {
      key,
      expiredTime,
      response,
    });
  },
  /**
   * 清空缓存
   */
  clear() {
    window.$vApp.store.memory.clear();
  },
};

axios.defaults.timeout = 30000;
(() => {
  if (!!process.env.VUE_APP_SERVER_URL) {
    axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
  }
})();
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [
  data => {
    if (!Object.isEmpty(data)) {
      Object.keys(data).forEach(key => {
        const value = data[key];
        if (Object.isObject(value)) {
          data[key] = JSON.stringify(value);
          return;
        }
        if (Object.isArray(value)) {
          const containsObj = value.findIndex(_ => Object.isObject(_));
          if (containsObj > -1) {
            data[key] = JSON.stringify(value);
          }
          return;
        }
        data[key] = value;
      });
    }
    return qs.stringify(data, {
      skipNulls: true,
      arrayFormat: 'comma',
      serializeDate: date => {
        if (!Date.isDate(date)) {
          return null;
        }
        return date.format('yyyy-MM-dd hh:mm:ss');
      },
    });
  },
];
//
axios.interceptors.request.use((config) => {
  window.$vApp.vueInst.$Loading.start();
  console.log('[axios] add headers Token',window.$token);
  const newConfig = config;
  newConfig.headers = {
    ...newConfig.headers,
    ...{
      token: window.$token,
      type: window.$system || '',
    },
  };
  return newConfig;
}, err => {
  console.error('axios.request error with ', err);
  return Promise.reject(err);
});
axios.interceptors.response.use((response) => {
  window.$vApp.vueInst.$Loading.finish();
  const { data, config } = response;
  if (data.code === 4000100 || data.code === 401) {
    window.$vApp.vueInst.$dialog.error('登录认证已失效,请重新登录', true);
    window.$token = '';
    window.$vApp.vueInst.$router.push('/admin/login').catch((e) => {
      console.warn('router.push error', e.message);
    });
    return Promise.reject('token expired');
  }
  if (data.code !== 200) {
    window.$vApp.vueInst.$dialog.error(data.message || `请求发生错误#STATUS(${ data.code })`, true);
    return Promise.reject();
  }
  if (config.withCache === true) {
    Cache.set(config.url, config.data, config.cacheTime, response);
  }
  return Promise.resolve(response);
}, error => {
  console.error('[axios] response error',error);
  window.$vApp.vueInst.$Loading.error();
  const { response, message } = error;
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    window.$vApp.vueInst.$dialog.error('请求超时,请稍后重试', true);
    return Promise.reject(error);
  }
  if (!response) {
    window.$vApp.vueInst.$dialog.error(message);
    return Promise.reject(error);
  }
  const { status } = response;
  if (status === 500) {
    window.$vApp.vueInst.$dialog.error('服务器发生错误,请稍后重试', true);
    return Promise.reject(error);
  }
  if (status === 504 || status === 404) {
    window.$vApp.vueInst.$dialog.error('服务暂不可用,请稍后重试', true);
    return Promise.reject(error);
  }
  if (status === 403) {
    window.$vApp.vueInst.$dialog.error('权限不足,请联系管理员!', true);
    return Promise.reject(error);
  }
  if (status === 401) {
    window.$vApp.vueInst.$dialog.error('登录认证已失效,请重新登录', true);
    window.$token = '';
    window.$vApp.vueInst.$router.push('/login');
    return Promise.reject(error);
  }
  window.$vApp.vueInst.$dialog.error(`请求发生错误#STATUS(${ status })`);
  return Promise.reject(error);
});

export const get = (url,
  cache = {
    withCache: false,
    cacheTime: Cache.cacheTime,
  },
  headers = {}) => new Promise((resolve, reject) => {
  const response = Cache.get(url);
  if (response) {
    resolve(response.data);
    return;
  }
  axios.get(url,
    {
      withCache: cache.withCache,
      cacheTime: cache.cacheTime,
      headers: Object.assign({}, headers),
    })
  .then((res) => {
    resolve(res.data);
  })
  .catch((err) => {
    reject(err.data);
  });
});
export const post = (url, data = {},
  cache = {
    withCache: false,
    cacheTime: Cache.cacheTime,
  },
  headers = {}) => new Promise((resolve, reject) => {
  const newCache = {
    ...{
      withCache: false,
      cacheTime: Cache.cacheTime,
    },
    ...cache,
  };
  const response = Cache.get(url, data);
  if (response) {
    resolve(response.data);
    return;
  }
  axios.post(
    url,
    {
      ...{},
      ...data,
    },
    {
      withCache: newCache.withCache,
      cacheTime: newCache.cacheTime,
      headers: {
        ...{},
        ...headers,
      },
    },
  )
  .then((res) => {
    resolve(res.data);
  })
  .catch((err) => {
    reject(err);
  });
});
export const download = (url, data, headers = {}, progressCallback) => new Promise((resolve, reject) => {
  axios.post(
    url,
    {
      ...{},
      ...data,
    },
    {
      headers: Object.assign({}, headers),
      onUploadProgress(progressEvent) {
        if (Object.isFunction(progressCallback)) {
          progressCallback(progressEvent);
        }
      },
    },
  )
  .then((res) => {
    resolve(res.data);
  })
  .catch((err) => {
    reject(err);
  });
});
export const upload = (url, formData, progressCallback) => new Promise((resolve, reject) => {
  axios.post(
    url,
    formData,
    {
      timeout: 0,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest(data) {
        return data;
      },
      onUploadProgress(progressEvent) {
        if (Object.isFunction(progressCallback)) {
          progressCallback(progressEvent);
        }
      },
    },
  )
  .then((res) => {
    resolve(res.data);
  })
  .catch((err) => {
    reject(err);
  });
});

/**
 * 代理模式
 * @param func
 * @param args
 * @param cache
 * @param headers
 * @returns {Promise<unknown>}
 */
export const invoke = (func, args = [],
  cache = {
    withCache: false,
    cacheTime: Cache.cacheTime,
  },
  headers = {}) => new Promise((resolve, reject) => {
  const data = {};
  args.forEach((item, index) => {
    data[`arg${ index + 1 }`] = JSON.stringify(item);
  });
  const url = [
    VApp.serverUrl,
    '/proxy/invoke/',
    func,
  ].join('');
  const newCache = {
    ...{
      withCache: false,
      cacheTime: Cache.cacheTime,
    },
    ...cache,
  };
  const response = Cache.get(url, data);
  if (response) {
    resolve(response.data);
    return;
  }
  axios.post(
    url,
    data,
    {
      withCache: newCache.withCache,
      cacheTime: newCache.cacheTime,
      headers: {
        ...{},
        ...headers,
      },
    },
  )
  .then((res) => {
    resolve(res.data);
  })
  .catch((err) => {
    reject(err);
  });
});

const install = (Vue) => {
  Object.defineProperties(
    Vue.prototype, {
      $get: {
        value: get,
      },
      $post: {
        value: post,
      },
      $download: {
        value: download,
      },
      $upload: {
        value: upload,
      },
      $invoke: {
        value: invoke,
      },
    },
  );
};

const http = {
  install,
};

export default http;