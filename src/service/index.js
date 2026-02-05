/**
 * @Author: Gyl
 * @Date: 2026-02-04 19:37:44
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-05 15:42:20
 * @Description:
 */
import axios from 'axios';

import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import { AbortRequest } from './abortRequest';

import router from '@/router';

const abortRequest = new AbortRequest();

Nprogress.configure({
  easing: 'ease',
  speed: 600,
});

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVICE_URL,
  timeout: 300000,
});

const noLoginCallback = () => {
  router.replace({
    path: '/login',
  });
};

const errorCallback = (code, mes) => {
  let message = '';

  switch (code) {
    case 401:
      message = mes || '登录已过期，请重新登录';
      noLoginCallback();
      break;
    case 403:
      message = mes || '服务器拒绝响应';
      break;
    case 404:
      message = '网络请求不存在';
      break;
    case 504:
      message = '服务器内部异常';
      break;
    default:
      message = mes;
      break;
  }

  if (message)
    ElNotification.error({
      title: '错误',
      duration: 3000,
      message,
    });
};

instance.interceptors.request.use(
  (config) => {
    Nprogress.start();

    if (!config.headers.uid) {
      config.headers.uid = getUid(16);
    }

    const userStore = useUserStoreWithOutside();
    const { getToken } = storeToRefs(userStore);

    if (config.url !== 'user/login') config.headers['Authorization'] = getToken.value ?? '';

    // if (config.method === 'get')
    //   config.paramsSerializer = {
    //     encode: (params) => Qs.stringify(params, { arrayFormat: 'repeat' }),
    //   };

    // if (config.method === 'post' && queryDataType(config.data) === 'object') {
    //   console.log('入参-加密前===', config.data);

    //   config.data = {
    //     data:
    //       checkNullValue(config.data) || config.data === '[]' || config.data === '{}'
    //         ? ''
    //         : cryption.encryptByAES(config.data),
    //     timestamp: new Date().getTime(),
    //     sign: '',
    //   };

    //   console.log('入参-加密后===', config.data);
    // }

    // abortRequest.addAbort(config);

    // delete config.headers.notAbort;

    return config;
  },
  (err) => Promise.reject(err),
);

instance.interceptors.response.use(
  (res) => {
    Nprogress.done();

    abortRequest.removeAbort(res.config);

    if (res.status === 200) {
      const isFileStream = res.config.responseType
        ? ['arraybuffer', 'blob'].includes(res.config.responseType)
        : false;
      if (isFileStream) return res;

      if (res.data.code !== 0) {
        errorCallback(res.data.code, res.data?.msg || '服务器异常');

        return Promise.reject(res);
      }

      // res.data.data =
      //   res.data.data && queryDataType(res.data.data) === 'String'
      //     ? aesCrypto({
      //         type: 'decrypt',
      //         word: res.data.data,
      //       })
      //     : res.data.data || {};

      return res.data;
    } else {
      errorCallback(res.data.code, res.data.msg || '服务器异常');

      return Promise.reject(res);
    }
  },
  (err) => {
    Nprogress.done();

    err.config && abortRequest.removeAbort(err.config);

    if (err.response?.status) {
      const errData = err.response?.data;

      errorCallback(errData?.code || err.response?.status, errData.msg || '服务器异常');
    }

    return Promise.reject(err.response || { data: { msg: '服务器异常' } });
  },
);

export default instance;
