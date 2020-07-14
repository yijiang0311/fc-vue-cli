const chalk = require('chalk');
const error = (message) => {
  console.error(chalk.red(message));
};
const log = (message) => {
  console.log(chalk.green(message));
};
const success = (message) => {
  console.log(chalk.white.bgGreen.bold(message));
};

module.exports = {
  error,
  log,
  success,
};
