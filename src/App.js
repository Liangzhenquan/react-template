/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-21 15:16:56
 * @LastEditors: liang
 * @LastEditTime: 2020-05-28 13:21:34
 */
import './index.less';
import 'normalize.css';
import { Button, Slider } from 'antd';
import React, { useState } from 'react';
class Text extends React.Component {
  state = {
    name: 'tom'
  };
  render() {
    return <div>123</div>;
  }
}
function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((count) => count + 1);
  };
  return (
    <div className="app">
      <Text />
      <p>点击数: {count}</p>
      <Slider min={0} max={100} value={count} />
      <Button onClick={handleClick}>点击我</Button>
    </div>
  );
}
export default App;
