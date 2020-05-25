/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-21 17:30:26
 * @LastEditors: liang
 * @LastEditTime: 2020-05-24 21:41:55
 */
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getClientEnvironment = require("./env");
const paths = require("./paths");
const path = require("path");
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
const { appPackageJson } = paths
module.exports = merge(common('production'), {
  mode: 'production',
  output: {
    path: paths.appBuild,
    filename: "static/js/[name].[contenthash:8].js",
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
    devtoolModuleFilenameTemplate: (info) => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/"),
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
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        }
      )
    ),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new webpack.DefinePlugin(env.stringified),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
})