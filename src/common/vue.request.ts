import type { App, Plugin } from 'vue';

const install = (app: App)=> {
  app.config.globalProperties.$get = () => {
    console.log('this is test')
  }
  // Object.defineProperties(
  //   Vue.prototype, {
  //     // $get: {
  //     //   value: get,
  //     // },
  //     // $post: {
  //     //   value: post,
  //     // },
  //     // $download: {
  //     //   value: download,
  //     // },
  //     // $upload: {
  //     //   value: upload,
  //     // },
  //     // $invoke: {
  //     //   value: invoke,
  //     // },
  //     $get: {
  //       value: () => {
  //         console.log('this is test')
  //       }
  //     }
  //   },
  // );
};

const http = {
  install
}
