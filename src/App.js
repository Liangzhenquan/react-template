/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-21 15:16:56
 * @LastEditors: liang
 * @LastEditTime: 2020-05-25 09:21:15
 */
import React, { useState } from "react";
import { Button } from 'antd';
import 'normalize.css';
function App() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count => count + 1)
  }
  return (
    <div className="app">
      <p>点击数: {count}</p>
      <Button onClick={handleClick}>点击我</Button>
    </div >
  )
}
export default App;