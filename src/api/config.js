/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-28 14:08:05
 * @LastEditors: liang
 * @LastEditTime: 2020-05-29 10:31:46
 */
import { getStorage, storageKeys } from '@/utils/storage';
import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
import { useRequest } from '@umijs/hooks';
import urls from '@/url';
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const handleError = (status) => {
  switch (status) {
    case 401:
      message.error('token无效');
      break;
    default:
      break;
  }
};
const instance = axios.create({
  baseURL: isEnvDevelopment ? urls.dev : urls.pro,
  timeout: 40000
});
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    getStorage(storageKeys.token);
    const token = getStorage(storageKeys.token);
    if (token) {
      config.headers['Authorization'] = token;
    }
    if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  },
  (error) => {
    console.log(error);
    // return Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    response?.status && handleError(response.status);
    // return Promise.reject(error);
  }
);
const get = (url, params, config) => {
  return useRequest(url, {
    requestMethod: (param) => instance.get(param, { params }),
    ...config
  });
};
const post = (url, body, config) => {
  return useRequest(url, {
    requestMethod: (param) => instance.post(param, qs.stringify(body)),
    ...config
  });
};
export { get, post };
