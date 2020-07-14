const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
shell.config.fatal = true;

const error = (message) => {
  console.error(chalk.red(message));
};
const log = (message) => {
  console.log(chalk.green(message));
};

module.exports = async (name, cmdObj) => {
  try {
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
    if (cmdObj.component) {
      //创建一个组件。兼容组件不同的目录名称 支持 src/components src/component 三种任一种

      if (fs.existsSync(path.resolve(rootDir, 'src/components'))) {
        destDir = path.resolve(rootDir, 'src/components', name);
      } else if (fs.existsSync(path.resolve(rootDir, 'src/component'))) {
        destDir = path.resolve(rootDir, 'src/component', name);
      } else {
        error(
          '您的通用组件存放文件目录不符合规范，请将其放在 /src/components下'
        );
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

    let sourceDir;
    // -s
    if (cmdObj.simple) {
      //创建一个简单版.vue文件
      sourceDir = path.resolve(
        __dirname,
        '../../template/vue-page-simple-template.vue'
      );
      shell.mkdir('-p', destDir.slice(0, destDir.lastIndexOf('/')));
      destDir += '.vue';
    } else {
      shell.mkdir('-p', destDir);
      sourceDir = path.resolve(__dirname, '../../template/vue-page-template/*');
    }
    shell.cp('-R', sourceDir, destDir);
    if (fs.existsSync(destDir)) {
      //添加该页面对应的路由
      if (!cmdObj.component) {
        await addRouter(name, rootDir, cmdObj.simple, destDirRootName);
      }
      log(`成功创建页面${name},请在${destDir}下查看`);
    } else {
      console.error(
        chalk.red(
          `创建页面失败，请到项目【根目录】或者【@src】目录下执行该操作`
        )
      );
    }
  } catch (error) {
    console.error(chalk.red(error));
    console.error(
      chalk.red(
        `创建页面失败，请确保在项目【根目录】或者【@src】目录下执行该操作\n，否则请联系@zhongyi`
      )
    );
  }
};

const addRouter = async (name, rootDir, simple, destDirRootName) => {
  let routerPath, pagePath;
  if (fs.existsSync(path.resolve(rootDir, './src/router.js'))) {
    routerPath = path.resolve(rootDir, './src/router.js');
  } else if (fs.existsSync(path.resolve(rootDir, './src/router/index.js'))) {
    routerPath = path.resolve(rootDir, './src/router/index.js');
  } else {
    error(
      '您的项目路由文件不符合规范，请将其放在/src/router.js或者/src/router/index.js'
    );
  }
  pagePath = `./${destDirRootName}/${name}/index.vue`;
  if (simple) {
    pagePath = `./${destDirRootName}/${name}.vue`;
  }
  try {
    let content = await readFile(routerPath, 'utf-8');
    //找到 const routes = 与 ]; 之间的内容，也就是routes数组
    const reg = /const\s+routes\s*\=([\s\S]*)\]\s*\;/;

    const pathStr = `path: '/${name}',`;
    const nameStr = `name: '${name}',`;
    let componentStr = `component: () =>
        import(/* webpackChunkName: "${name}" */ '${pagePath}'),`;

    content = content.replace(reg, function (match, $1, index) {
      $1 = $1.trim();
      if (!$1.endsWith(',')) {
        $1 += ',';
      }
      return `const routes = ${$1}
  {
    ${pathStr}
    ${nameStr}
    ${componentStr}
  }
];`;
    });
    try {
      await writeFile(routerPath, content, 'utf-8');
    } catch (err) {
      error(err);
    }
  } catch (err) {
    error(err);
  }
};
