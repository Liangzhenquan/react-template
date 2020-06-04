/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-28 14:08:05
 * @LastEditors: liang
 * @LastEditTime: 2020-05-29 16:42:08
 */
import { getStorage, storageKeys } from '@/utils/storage';
import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
import urls from '@/url';
import { useRequest } from '@umijs/hooks';
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
    return response.data;
  },
  (error) => {
    const { response } = error;
    response?.status && handleError(response.status);
    // return Promise.reject(error);
  }
);
const get = (url, config) =>
  useRequest((params) => instance.get(url, { params }), config);
const post = (url, config) => {
  return useRequest(
    (params) => instance.post(url, qs.stringify(params)),
    config
  );
};
export { get, post };
