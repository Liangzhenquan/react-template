/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-21 11:54:24
 * @LastEditors: liang
 * @LastEditTime: 2020-05-21 15:30:26
 */
const paths = require('./paths');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');

const host = process.env.HOST || '0.0.0.0';
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
const sockPort = process.env.WDS_SOCKET_PORT;
module.exports = function (proxy, allowedHost) {
  return {
    disableHostCheck:
      !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    contentBasePublicPath: paths.publicUrlOrPath,
    watchContentBase: true,
    hot: true,
    transportMode: 'ws',
    injectClient: false,
    sockHost,
    sockPath,
    sockPort,
    publicPath: paths.publicUrlOrPath.slice(0, -1),
    quiet: true, //清理控制台
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc)
    },
    host,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath
    },
    public: allowedHost,
    before(app, server) {
      app.use(evalSourceMapMiddleware(server));
      app.use(errorOverlayMiddleware());
    },
    after(app) {
      app.use(redirectServedPath(paths.publicUrlOrPath));
      app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    }
  };
};
