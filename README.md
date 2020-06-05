# 2.0 版本

## 2.0.1

- 该版本将加入 axios 做为 http 请求
  > 使用 axios 请求库，加入 umijs 的 useRequest，
  > websocket 加入，storage 封装，url 提取为 url.js
  > 加入 nprogress 加载进度条，增强交互，加入 react-router-dom

当前目录结构

```
| config
| public
| src
  |api      --axios配置相关，配置请求方法
  |components  --公共组件
    ErrorBoundary.jsx  --错误边界组件
    Nprogress.jsx      --顶部加载进度条
  |utils    --公共函数相关,主要封装一些全局方法
    storage.js  --存储配置
    websocket.js  --websocket配置相关
  .url.js       --一些开发环境和生产环境的url，项目所有api的url都存于此处
  |router       -- 路由配置处
  |views        --page页面
    |error      --一些404、403等页面
.editorconfig   --编辑器的配置
.eslintignore   --eslint 忽略检测的文件配置
.eslint         --eslint配置
.prettierrc     --prettier格式化的配置文件
```

## 版本 bug 修复

- 修复 import 引入模块必须输入完整路径的 bug
  到该版本，已经修复了部分遇到的 eslint 配置问题和 webpack 配置带来到问题，并引入了错误边界，umijs/hooks 和 react-router-dom，已经可以拿来即用。
