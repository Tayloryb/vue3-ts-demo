// /**
//  *
//  */
//  import supportCookie from '@common/vue.cookie.check';

//  const VApp = {
//    vueInst: null,
//    serverUrl: null,
//    keys: {
//      account: {
//        token: 'token',
//      },
//      system: {
//        type: 'type',
//      },
//    },
//    permission: {
//      data: {},
//      checkAuth(permissionIds) {
//        if (Array.isEmpty(permissionIds)) {
//          return true;
//        }
//        for (let i = 0; i < permissionIds.length; i += 1) {
//          if (VApp.permission.hasAuth(permissionIds[i])) {
//            return true;
//          }
//        }
//        return false;
//      },
//      hasAuth(id) {
//        const key = `m${ id }`;
//        return Object.prototype.isPrototypeOf.call(VApp.permission.data, key);
//      },
//    },
//    store: {
//      cookies: {
//        logined() {
//          return !String.isEmpty(VApp.store.cookies.token());
//        },
//        token() {
//          return VApp.store.cookies.get(VApp.keys.account.token);
//        },
//        renew() {
//          const token = VApp.store.cookies.token();
//          if (String.isEmpty(token)) {
//            return;
//          }
//          VApp.store.cookies.set(VApp.keys.account.token, token, 1);
//        },
//        set(key, value, expires) {
//          if (String.isEmpty(key)) {
//            return;
//          }
//          if (!supportCookie()) {
//            VApp.store.local.set(key, value);
//            return;
//          }
//          const attributes = {};
//          if (Number.check(expires, 0)) {
//            attributes.expires = expires;
//          }
//          // if (process.env.NODE_ENV !== 'development') {
//          // }
//          window.jsCookies.set(key, value, attributes);
//        },
//        get(key) {
//          if (String.isEmpty(key)) {
//            return;
//          }
//          if (!supportCookie()) {
//            return VApp.store.local.get(key);
//          }
//          const attributes = {};
//          // if (process.env.NODE_ENV !== 'development') {
//          // }
//          return window.jsCookies.get(key, attributes);
//        },
//        clear() {
//          const cookies = window.jsCookies.get();
//          if (!cookies) {
//            return;
//          }
//          if (!supportCookie()) {
//            VApp.store.local.clear();
//            return;
//          }
//          const attributes = {};
//          // if (process.env.NODE_ENV !== 'development') {
//          // }
//          Object.keys(cookies).forEach((key) => {
//            window.jsCookies.remove(key, attributes);
//          });
//        },
//        remove(key) {
//          if (String.isEmpty(key)) {
//            return;
//          }
//          if (!supportCookie()) {
//            return VApp.store.local.remove(key);
//          }
//          const attributes = {};
//          // if (process.env.NODE_ENV !== 'development') {
//          // }
//          window.jsCookies.remove(key, attributes);
//        },
//        getAndRemove(key) {
//          if (String.isEmpty(key)) {
//            return null;
//          }
//          const val = VApp.store.cookies.get(key);
//          VApp.store.cookies.remove(key);
//          return val;
//        },
//      },
//      session: {
//        logined() {
//          return !String.isEmpty(VApp.store.session.token());
//        },
//        token() {
//          return VApp.store.session.get(VApp.keys.account.token);
//        },
//        set(key, value) {
//          if (String.isEmpty(key)) {
//            return;
//          }
//          window.jsSessionStore.set(key, JSON.stringify(value));
//        },
//        get(key) {
//          if (String.isEmpty(key)) {
//            return;
//          }
//          const json = window.jsSessionStore.get(key);
//          if (String.isEmpty(json)) {
//            return;
//          }
//          try {
//            return JSON.parse(json);
//          } catch (e) {
//            console.warn(e);
//          }
//          return null;
//        },
//        clear() {
//          window.jsSessionStore.clearAll();
//        },
//        remove(key) {
//          if (String.isEmpty(key)) {
//            return;
//          }
//          window.jsSessionStore.remove(key);
//        },
//        getAndRemove(key) {
//          const val = VApp.store.session.get(key);
//          VApp.store.local.remove(key);
//          return val;
//        },
//      },
//      local: {
//        set(key, value) {
//          if (String.isEmpty(key)) {
//            return;
//          }
//          window.jsStorage.set(key, JSON.stringify(value));
//        },
//        get(key) {
//          if (String.isEmpty(key)) {
//            return;
//          }
//          const json = window.jsStorage.get(key);
//          if (String.isEmpty(json)) {
//            return;
//          }
//          try {
//            return JSON.parse(json);
//          } catch (e) {
//            console.warn(e);
//          }
//          return null;
//        },
//        clear() {
//          window.jsStorage.clearAll();
//        },
//        remove(key) {
//          if (String.isEmpty(key)) {
//            return;
//          }
//          window.jsStorage.remove(key);
//        },
//        getAndRemove(key) {
//          const val = VApp.store.local.get(key);
//          VApp.store.local.remove(key);
//          return val;
//        },
//      },
//      memory: {
//        mkey(key) {
//          if (String.isEmpty(key)) {
//            return key;
//          }
//          let nkey = key.replace(/\./g, '_')
//          .replace(/\//g, '$')
//          .replace(/\\/g, '@')
//          .replace(/\*/g, '#');
//          const newKey = ['MC_'];
//          newKey.push(nkey);
//          return newKey.join('');
//        },
//        get(key) {
//          if (!VApp.__cache__) {
//            VApp.__cache__ = {};
//            return null;
//          }
//          return VApp.__cache__[VApp.store.memory.mkey(key)];
//        },
//        set(key, value) {
//          if (!VApp.__cache__) {
//            VApp.__cache__ = {};
//          }
//          VApp.__cache__[VApp.store.memory.mkey(key)] = value;
//        },
//        remove(key) {
//          delete VApp.__cache__[VApp.store.memory.mkey(key)];
//        },
//        clear() {
//          VApp.__cache__ = {};
//        },
//        each(callback) {
//          if (!Object.isFunction(callback)) {
//            return;
//          }
//          if (!VApp.__cache__) {
//            return;
//          }
//          Object.keys(VApp.__cache__).forEach(key => {
//            callback(VApp.__cache__[key]);
//          });
//        },
//        getAndRemove(key) {
//          const val = VApp.store.memory.get(key);
//          VApp.store.memory.remove(key);
//          return val;
//        },
//      },
//    },
//    invokeUrl(func) {
//      return [VApp.serverUrl, '/proxy/invoke/', func].join('');
//    },
//    fullUrl(path) {
//      return [VApp.serverUrl, path].join('');
//    },
//    uploadUrl(params) {
//      const url = [];
//      url.push(VApp.serverUrl);
//      url.push('/proxy/upload_file?token=');
//      url.push(VApp.store.get(VApp.keys.account.token));
//      if (Object.isNotNullObject(params)) {
//        Object.keys(params).forEach((key) => {
//          url.push('&');
//          url.push(key);
//          url.push('=');
//          url.push(encodeURIComponent(params[key]));
//        });
//      }
//      return url.join('');
//    },
//    location: {
//      reload() {
//        VApp.location.hrefUrl(window.location.href);
//      },
//      openUrl(url) {
//        const newUrl = VApp.location.assembleHref(url);
//        if (String.isEmpty(newUrl)) {
//          return;
//        }
//        window.open(newUrl);
//      },
//      hrefUrl(url) {
//        const newUrl = VApp.location.assembleHref(url);
//        if (String.isEmpty(newUrl)) {
//          return;
//        }
//        window.location.href = newUrl;
//      },
//      assembleHref(url) {
//        let newUrl = url;
//        if (String.isEmpty(newUrl)) {
//          return url;
//        }
//        const randomRegx = /r=[\d.]+/;
//        const timeRegx = /t=[\d]+/;
//        do {
//          if (newUrl.indexOf('r=') > -1) {
//            newUrl = newUrl.replace(randomRegx, `r=${ Math.random() }`);
//            newUrl = newUrl.replace(timeRegx, `t=${ new Date().getTime() }`);
//            break;
//          }
//          if (newUrl.indexOf('?') > -1) {
//            newUrl = `${ newUrl }&r=${ Math.random() }&t=${ new Date().getTime() }`;
//          } else {
//            newUrl = `${ newUrl }?r=${ Math.random() }&t=${ new Date().getTime() }`;
//          }
//        } while (false);
//        return newUrl;
//      },
//    },
//  };
 
//  export default VApp;