const fs = require('fs');
const path = require('path');
const { error } = require('./util');
/**
 * 检查 用户是否在项目根目录或者./src目录下执行，是否有约定的项目目录结构，是否已经存在该组件
 * @param {Stirng} name
 * @param {Object} cmdObj
 * @return {Object} {destDirRootName ,destDir} 目标文件夹名称，目标文件路径
 */
const checkContext = (name, cmdObj,type) => {
  // console.log(process.cwd());
  let destDir, destDirRoot, destDirRootName;
  const curDir = path.resolve('.');
  let rootDir = '.';
  const basename = path.basename(curDir);

  //兼容 用户在 ./src目录下执行该命令
  if (basename === 'src') {
    rootDir = path.resolve('..', rootDir);
  }
  //判断下项目根目录rootDir下面有没有src目录，如果没有那说明用户没有在正确的路径下执行该命令
  if (!fs.existsSync(path.join(rootDir, 'src'))) {
    error(`创建页面失败，请到项目【根目录】或者【@src】目录下执行该操作`);
    process.exit(1);
  }
  // -c
  if (type === 'component') {
    //创建一个组件。兼容组件不同的目录名称 支持 src/components src/component 三种任一种

    if (fs.existsSync(path.resolve(rootDir, 'src/components'))) {
      destDir = path.resolve(rootDir, 'src/components', name);
    } else if (fs.existsSync(path.resolve(rootDir, 'src/component'))) {
      destDir = path.resolve(rootDir, 'src/component', name);
    } else {
      error('您的通用组件存放文件目录不符合规范，请将其放在 /src/components下');
    }
  } else {
    // 兼容路由页面不同的目录名称 支持 src/views src/pages src/page 三种任一种
    if (fs.existsSync(path.resolve(rootDir, 'src/views'))) {
      destDir = path.resolve(rootDir, 'src/views', name);
      destDirRootName = 'views';
    } else if (fs.existsSync(path.resolve(rootDir, 'src/pages'))) {
      destDir = path.resolve(rootDir, 'src/pages', name);
      destDirRootName = 'pages';
    } else if (fs.existsSync(path.resolve(rootDir, 'src/page'))) {
      destDir = path.resolve(rootDir, 'src/page', name);
      destDirRootName = 'page';
    } else {
      error(
        '您的页面组件存放文件目录不符合规范，请将其放在 /src/view 或者 /src/pages 或者 /src/page 目录'
      );
    }
  }

  //是否已经存在该组件
  if (
    (cmdObj.simple && fs.existsSync(destDir + '.vue')) ||
    (!cmdObj.simple && fs.existsSync(destDir + '/index.vue'))
  ) {
    error(`${name} 页面/组件 已经存在，创建失败！`);
    process.exit(1);
  }
  return { destDirRootName, destDir };
};

module.exports = checkContext;
