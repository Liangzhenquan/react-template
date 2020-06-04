# 项目目录结构

```
|config    --webpack 相关配置
|public    --html模板相关，生成项目HTML模板
|scripts
  --build.js    --打包项目命令
  --start.js    --开发环境启动服务器命令
.eslintrc --eslint配置相关
.gitignore --指定不上传到远程服务器的文件和文件夹
README.md  --项目说明文件
package.json
yarn.lock
```

# 技术说明

- normalize.css 项目 css 默认样式兼容
- ramda 函数式编程库
- styled-components css-in-js 库

# 规范

使用了 eslint 和 prettier

- eslint --代码检查
- prettier --代码格式化

> 如果用的是 vscode，请先安装 eslint 和 prettier 插件
> 然后启用 eslint 和 prettier，prettier 还需要一些配置：`ctrl + shift + p`启动 vscode 的代码格式化程序为 prettier，并且在 vscode 的 settings.json 配置文件加入
> "editor.formatOnSave": true,以使得 vscode 保存时自动格式化代码

## 版本分支

- master -- 基础分支
- template-v2.0.0 --优化分支，eslint.prettierrc 配置 bug 优化，加入@umijs/hooks，并添加 API 请求，添加登录页面
- tempalate-v2.0.1 --优化分支，添加 components 文件夹来存放公共组件。
  - ErrorBoundary.js --错误边界
