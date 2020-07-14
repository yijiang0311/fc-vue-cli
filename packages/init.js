const { program } = require('commander');

function programInit() {
  program.version(require('../package.json').version);
  program
    .command('add-page2 <name>')
    .description(
      'add a page, 默认加在./src/views目录下，\n支持"/"来创建子目录例如:add-page demo/test'
    )
    .option('-s, --simple', '创建简单版的页面，只新增一个.vue文件')
    .option(
      '-c, --component',
      '创建一个组件，组件的存放路径默认是./src/components'
    )
    .action(require('./commands/add-page2'))
    .on('--help', () => {
      console.log('this is other help');
    });

  program
    .command('add-component [name]')
    .description(
      '新增一个通用组件，默认加在./src/components 或者 .src/component目录\n 支持创建多级目录，例如：demo/test/header '
    )
    .option('-s, --simple', '创建简单版的页面，只新增一个.vue文件')
    .action(require('./commands/add-component'));

  program.parse(process.argv);
}

programInit();
