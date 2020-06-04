/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-21 15:16:56
 * @LastEditors: liang
 * @LastEditTime: 2020-06-04 10:40:59
 */
import './index.less';
import 'normalize.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import Login from './views/login';
import React from 'react';
import { message } from 'antd';
message.config({
  duration: 2,
  maxCount: 2
});
function App() {
  return (
    <ErrorBoundary>
      <Login />
    </ErrorBoundary>
  );
}
export default App;
