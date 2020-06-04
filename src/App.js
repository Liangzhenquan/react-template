/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-21 15:16:56
 * @LastEditors: liang
 * @LastEditTime: 2020-05-29 14:58:21
 */
import './index.less';
import 'normalize.css';
import Login from './views/login';
import React from 'react';
import { message } from 'antd';
message.config({
  duration: 2,
  maxCount: 2
});
function App() {
  return (
    <div className="app">
      <Login />
    </div>
  );
}
export default App;
