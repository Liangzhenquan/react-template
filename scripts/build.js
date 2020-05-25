/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-24 21:20:48
 * @LastEditors: liang
 * @LastEditTime: 2020-05-24 21:35:15
 */
"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

process.on("unhandledRejection", (err) => {
  throw err;
});

require("../config/env");
const paths = require("../config/paths");
const config = require("../config/webpack.prod");
const webpack = require('webpack');
const FileSizeReporter = require("react-dev-utils/FileSizeReporter");
const fs = require("fs-extra");
const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}
const isInteractive = process.stdout.isTTY;
const { checkBrowsers } = require("react-dev-utils/browsersHelper");
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    //首先，在构建目录中读取当前文件大小。
    //这可以让我们显示它们以后有多少更改。
    return measureFileSizesBeforeBuild(paths.appBuild)
  })
  .then((previousFileSizes) => {
    //删除所有内容，但保留目录，以便
    //如果在该目录，则不会进入垃圾箱
    fs.emptyDirSync(paths.appBuild);
    // Merge with the public folder
    copyPublicFolder();
    // Start the webpack build
    return build(previousFileSizes);
  })
function build(previousFileSizes) {
  console.log("正在创建优化的生产版本...");
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }
        let errMessage = err.message;
        messages = formatWebpackMessages({
          errors: [errMessage],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        );
      }
      if (messages.errors.length) {
        //仅保留第一个错误。 其他通常是指示性的
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join("\n\n")));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== "string" ||
          process.env.CI.toLowerCase() !== "false") &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            "\nTreating warnings as errors because process.env.CI = true.\n" +
            "Most CI servers set it automatically.\n"
          )
        );
        return reject(new Error(messages.warnings.join("\n\n")));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    })
  })
}
function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: (file) => file !== paths.appHtml,
  });
}