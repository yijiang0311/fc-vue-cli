const inquirer = require('inquirer');

const askQuestions = () => {
  const questions = [
    {
      name: 'FILENAME',
      type: 'input',
      message: 'What is the name of component?[支持多级目录,例如：top/nav]',
    },
    {
      type: 'list',
      name: 'SIMPLE',
      message: 'What is the template type?',
      choices: [
        'normal:【create .vue .js .[style]】 ',
        'simple: 【create .vue】',
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