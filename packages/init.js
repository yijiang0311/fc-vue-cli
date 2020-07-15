const { program } = require('commander');
const { log } = require('./lib/util');

function programInit() {
  program.version(require('../package.json').version);
  program
    .command('add-page [name]')
    .description(
      'add a page, 默认加在./src/views 或 ./src/pages 或./src/page目录下，同时添加路由\n支持"/"来创建子目录例如:add-page user/login\n使用时，支持 fc-vue add-page 【回车】 来选择输入信息'
    )
    .option('-s, --simple', '创建简单版的页面，只新增一个.vue文件')
    .option('-t, --title <title>', '页面标题')
    .action(require('./commands/add-page'))
    .on('--help', () => {
      log('支持 fc-vue add-page 【回车】 来选择输入信息');
    });

  program
    .command('add-component [name]')
    .description(
      '新增一个通用组件，默认加在./src/components 或者 .src/component目录， \n 支持创建多级目录，例如：demo/test/header \n使用时，支持 fc-vue add-component 【回车】 来选择输入信息'
    )
    .option('-s, --simple', '创建简单版的页面，只新增一个.vue文件')
    .action(require('./commands/add-component'))
    .on('--help', () => {
      log('支持 fc-vue add-component 【回车】 来选择输入信息');
    });
  program.parse(process.argv);
}

programInit();
