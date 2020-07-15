const inquirer = require('inquirer');

const askQuestions = () => {
  const questions = [
    {
      name: 'FILENAME',
      type: 'input',
      message: '请输入页面的名称?[支持多级目录,例如：user/login]',
    },
    {
      name: 'TITLE',
      type: 'input',
      message: '请输入页面标题（meta.title）',
    },
    {
      type: 'list',
      name: 'SIMPLE',
      message: 'What is the template type?',
      choices: [
        'normal:【同时创建 .vue .js .[style]】 ',
        'simple: 【只创建 .vue】',
      ],
      filter: function (val) {
        return val.split(':')[0] === 'simple' ? true : false;
      },
    },
  ];
  return inquirer.prompt(questions);
};
const askCss = () => {
  const questions = [
    {
      name: 'CSS_TYPE',
      type: 'list',
      message: 'what is this css style type?',
      choices: ['.less', '.scss', '.sass', '.stylus'],
      filter: function (val) {
        return val.split('.')[1];
      },
    },
  ];
  return inquirer.prompt(questions);
};

module.exports = { askQuestions, askCss };
