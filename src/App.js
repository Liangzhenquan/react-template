/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-21 15:16:56
 * @LastEditors: liang
 * @LastEditTime: 2020-05-27 20:05:07
 */
import React, { useState } from 'react';
import { Button, Slider } from 'antd';
import 'normalize.css';
import './index.less';
function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    const abc = 123;
    setCount((count) => count + 1);
  };
  return (
    <div className="app">
      <p>点击数: {count}</p>
      <Slider min={0} max={100} value={count} />
      <Button onClick={handleClick}>点击我</Button>
    </div>
  );
}
export default App;
