/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-20 17:58:50
 * @LastEditors: liang
 * @LastEditTime: 2020-05-21 19:44:46
 */
const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const paths = require('../config/paths');

const config = require("../config/webpack.dev");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const createDevServerConfig = require("../config/webpackDevServer.config");
const { choosePort, prepareProxy, createCompiler, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils')
const { checkBrowsers } = require("react-dev-utils/browsersHelper");
const clearConsole = require("react-dev-utils/clearConsole");
const openBrowser = require("react-dev-utils/openBrowser");
const isInteractive = process.stdout.isTTY;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const chalk = require("react-dev-utils/chalk");
//如果缺少所需文件，则警告并崩溃
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    //尝试使用默认端口，但如果繁忙，将提供
    //在其他端口上运行。 “ choosePort（）” Promise解析为下一个空闲端口。
    return choosePort(HOST, DEFAULT_PORT)
  })
  .then(port => {
    if (port === null) return;    //未发现端口或者端口被占用，但不同意切换端口时，不启动服务器。
    const appName = 'process test';
    const protocol = process.env.HTTPS === "true" ? "https" : "http";
    /* urls: {lanUrlForConfig: '192.168.13.10', lanUrlForTerminal: 'http://192.168.13.10:\u001b[1mundefined\u001b[22m/',
         localUrlForTerminal: 'http://localhost:\u001b[1mundefined\u001b[22m/',
         localUrlForBrowser: 'http://localhost:3000/'
       }
    */
    const urls = prepareUrls(protocol, HOST, port)
    // const config = configFactory("development");
    // 代码报错时，不显示log.JS的错误
    const devSocket = {
      warnings: (warnings) =>
        devServer.sockWrite(devServer.sockets, "warnings", warnings),
      errors: (errors) =>
        devServer.sockWrite(devServer.sockets, "errors", errors),
    };
    const compiler = createCompiler({ appName, config, devSocket, urls, webpack })
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(
      proxySetting,
      paths.appPublic,
      paths.publicUrlOrPath
    );
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    )
    const devServer = new WebpackDevServer(compiler, serverConfig);
    devServer.listen(port, HOST, (err) => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log(chalk.cyan("开发服务器启动中...\n"));
      openBrowser(urls.localUrlForBrowser);
      ["SIGINT", "SIGTERM"].forEach(function (sig) {
        process.on(sig, function () {
          devServer.close();
          process.exit();
        });
      });
      if (isInteractive || process.env.CI !== "true") {
        // Gracefully exit when stdin ends
        process.stdin.on("end", function () {
          devServer.close();
          process.exit();
        });
        process.stdin.resume();
      }
    })
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });