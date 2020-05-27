/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-21 13:23:44
 * @LastEditors: liang
 * @LastEditTime: 2020-05-21 15:33:27
 */
'use strict';
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');
//以与webpack相同的顺序解析文件路径
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);
const resolveModule = (resolveFn, filePath) => {
  return resolveFn(`${filePath}.js`);
};
module.exports = {
  appPath: resolveApp('.'),
  appSrc: resolveApp('src'),
  appBuild: resolveApp('build'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPublic: resolveApp('public'),
  appPackageJson: resolveApp('package.json'),
  publicUrlOrPath
};
