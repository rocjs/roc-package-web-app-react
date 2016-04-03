#! /usr/bin/env node

const pkg = require('../package.json');

const initCli = require('roc').initCli;

initCli(pkg.version, pkg.name);
