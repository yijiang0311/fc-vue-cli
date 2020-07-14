const shell = require('shelljs');
const path = require('path');
shell.config.fatal = true;

/**
 *
 * @param {String} destDir 目标文件路径
 * @param {Boolean} simple
 * @param {less,scss,sass,stylus} cssType
 * @return { sourceDir, destFile} 模版原文件，生成的目标文件
 */
const copyTemplate = (destDir, simple, cssType) => {
  let sourceDir, destFile;
  // -s
  if (simple) {
    //创建一个简单版.vue文件
    sourceDir = path.resolve(
      __dirname,
      '../../template/vue-page-simple-template.vue'
    );
    shell.mkdir('-p', destDir.slice(0, destDir.lastIndexOf('/')));
    destDir += '.vue';
    shell.cp('-R', sourceDir, destDir);
    destFile = destDir;
  } else {
    shell.mkdir('-p', destDir);
    sourceDir = path.resolve(
      __dirname,
      `../../template/vue-page-template-${cssType}/*`
    );
    shell.cp('-R', sourceDir, destDir);
    destFile = path.resolve(destDir, 'index.vue');
  }
  return { sourceDir, destFile };
};

module.exports = copyTemplate;
