/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-21 17:01:09
 * @LastEditors: liang
 * @LastEditTime: 2020-05-24 21:39:00
 */
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const paths = require("./paths");
const path = require('path')
const getClientEnvironment = require("./env");
const { appPackageJson } = paths
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
module.exports = merge(common('development'), {
  mode: 'development',
  output: {
    path: undefined,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    devtoolModuleFilenameTemplate: ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
    jsonpFunction: `webpackJsonp${appPackageJson.name}`,
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: paths.appHtml,
        }
      )
    ),
    //公共网址在index.html中以％PUBLIC_URL％的形式提供，例如：
    // <link rel =“ icon” href =“％PUBLIC_URL％/ favicon.ico”>
    //除非您指定“主页”，否则它将是一个空字符串
    //在“ package.json”中，在这种情况下，它将是该URL的路径名。
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new webpack.DefinePlugin(env.stringified),
    // Moment.js是一个非常流行的库，它捆绑了大型语言环境文件
    //默认是由于webpack解释其代码的方式。 这是实用的
    //解决方案，要求用户选择导入特定的语言环境。
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    //如果不使用Moment.js，则可以将其删除：
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
})