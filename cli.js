#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const globalModules = require('global-modules');
const path = require('path');

// Check if global node_modules is in the PATH
const hasGlobalModulesInPath = process.env.PATH.split(path.delimiter).some((p) => p === globalModules);

// Add global node_modules to the PATH if not already present
if (!hasGlobalModulesInPath) {
    process.env.PATH += path.delimiter + path.join(globalModules, '.bin');
}

yargs(hideBin(process.argv))
    .scriptName('bean')
    .usage('$0 <command> [options]')
    .command(require('./commands/start'))
    .command(require('./commands/quit'))
    .demandCommand(1, 'Please provide a valid command.')
    .help()
    .version()
    .alias('h', 'help')
    .alias('v', 'version')
    .strict()
    .parse();
