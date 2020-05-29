/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-28 17:19:38
 * @LastEditors: liang
 * @LastEditTime: 2020-05-29 10:41:00
 */
import React from 'react';
import { post } from '@/api/config';
export default function Index() {
  post('/auth/login', {
    userName: 'liangzhenquan',
    passWord: 'd8075211260q',
    mobile: '',
    smsCode: ''
  });
  return <div>login</div>;
}
