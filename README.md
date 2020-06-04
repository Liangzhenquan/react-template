# 2.0 版本

## 2.0.0

- 该版本将加入 axios 做为 http 请求
  > 使用 axios 请求库，加入 umijs 的 useRequest，
  > websocket 加入，storage 封装，url 提取为 url.js

当前目录结构

```
| config
| public
| src
  |api      --axios配置相关，配置请求方法
  |utils    --公共函数相关,主要封装一些全局方法
    storage.js  --存储配置
    websocket.js  --websocket配置相关
  .url.js       --一些开发环境和生产环境的url，项目所有api的url都存于此处
  |views        --page页面
.editorconfig   --编辑器的配置
.eslintignore   --eslint 忽略检测的文件配置
.eslint         --eslint配置
.prettierrc     --prettier格式化的配置文件
```
