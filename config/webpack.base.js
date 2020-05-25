/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-21 16:55:23
 * @LastEditors: liang
 * @LastEditTime: 2020-05-25 14:30:13
 */
const paths = require('./paths');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const modifyVars = {
  'primary-color': '#7546c9',
  'link-color': '#1890ff', // 链接色
  'success-color': '#52c41a', // 成功色
  'warning-color': '#faad14', // 警告色
  'error-color': '#f5222d', // 错误色
  'font-size-base': '14px', // 主字号
  'heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
  'text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
  'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
  'disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
  'border-radius-base': '4px', // 组件/浮层圆角
  'border-color-base': '#d9d9d9', // 边框色
  'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)' // 浮层阴影
}
module.exports = function (webpackEnv = "development") {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve("style-loader"),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        // css is located in `static/css`, use '../../' to locate index.html folder
        // in production `paths.publicUrlOrPath` can be a relative path
        options: paths.publicUrlOrPath.startsWith(".")
          ? { publicPath: "../../" }
          : {},
      },
      {
        loader: require.resolve("css-loader"),
        options: cssOptions,
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          ident: "postcss",
          plugins: () => [
            require("postcss-flexbugs-fixes"),
            require("postcss-preset-env")({
              autoprefixer: {
                flexbox: "no-2009",
              },
              stage: 3,
            }),
          ]
        }
      }
    ]
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve("resolve-url-loader")
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
            lessOptions: {
              modifyVars,
              javascriptEnabled: true,
            },
          },
        }
      );
    }
    return loaders.filter(Boolean);
  }
  return {
    entry: [
      isEnvDevelopment &&
      require.resolve("react-dev-utils/webpackHotDevClient"),    //开发环境加入，否则热更新无效
      paths.appIndexJs
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": paths.appSrc
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: "pre",
          use: [
            {
              options: {
                cache: true,
                formatter: require.resolve("react-dev-utils/eslintFormatter"),
                eslintPath: require.resolve("eslint"),
                resolvePluginsRelativeTo: __dirname,
              },
              loader: require.resolve("eslint-loader"),
            },
          ],
          include: paths.appSrc,
        },
        {
          //“ oneOf”将遍历所有后续加载器，直到一个将
          //符合要求。 当没有装载机匹配时，它将掉落
          //返回到加载程序列表末尾的“文件”加载程序。
          oneOf: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: ['ramda', ['import', {
                    libraryName: "antd",
                    libraryDirectory: "es",
                    style: true, //不用less，则是css，用less，此处为true
                  }]]
                }
              }
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: false
              }),
              sideEffects: true,
            },
            {
              test: lessRegex,
              use: getStyleLoaders({
                importLoaders: 3,
                sourceMap: false
              }, 'less-loader'),
            },
            {
              loader: require.resolve("file-loader"),
              exclude: [/\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    }
  }
}