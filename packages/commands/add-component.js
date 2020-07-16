const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const { askQuestions, askCss } = require('../lib/ask-component');
const checkContext = require('../lib/checkContext');
const copyTemplate = require('../lib/copy-template');
const { error, log, success } = require('../lib/util');

shell.config.fatal = true;

module.exports = async (name, cmdObj) => {
  try {
    let cssType = 'less';
    let simple = cmdObj.simple;
    if (!name && simple) {
      error('错误的命令，缺少组件名称');
      process.exit(1);
    }
    if (!name) {
      const answers = await askQuestions();
      // console.log(answers);
      name = answers.FILENAME;
      simple = answers.SIMPLE;
      if (!simple) {
        const res = await askCss();
        cssType = res.CSS_TYPE;
      }
    }
    // console.log(process.cwd());
    //检查上下文环境，并返回目标文件目录路径
    let { destDir, destDirRootName } = checkContext(name, cmdObj, 'component');
    //复制模版到目标文件
    let { destFile } = copyTemplate(destDir, simple, cssType);

    if (fs.existsSync(destFile)) {
      log(`成功创建${name}组件,请在${destDir}下查看`);
    } else {
      console.error(
        chalk.red(`创建失败，请到项目【根目录】或者【@src】目录下执行该操作`)
      );
    }
  } catch (err) {
    console.error(chalk.red(err));
    console.error(
      chalk.red(
        `创建页面失败，请确保在项目【根目录】或者【@src】目录下执行该操作\n，否则请联系@zhongyi`
      )
    );
  }
};
