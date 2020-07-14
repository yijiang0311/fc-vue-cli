#!/usr/bin/env node

// 'use strict';
const chalk = require('chalk');

const currentNodeVersion = process.versions.node;
const major = currentNodeVersion.split('.')[0];
if (major < 10) {
  console.error(
    chalk.red(
      `You are running Node \n${currentNodeVersion} \nvue-assist-cli requires Node 10 or higher.\nPlease update your version of Node`
    )
  );
  process.exit(1);
}

require('../packages/init');
