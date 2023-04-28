#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const globalModules = require('global-modules');
const path = require('path');
const { spawn } = require('child_process');

// Check if global node_modules is in the PATH
const hasGlobalModulesInPath = process.env.PATH.split(path.delimiter).some((p) => p === globalModules);

// Add global node_modules to the PATH if not already present
if (!hasGlobalModulesInPath) {
    process.env.PATH += path.delimiter + path.join(globalModules, '.bin');
}

yargs(hideBin(process.argv))
    .scriptName('bean')
    .usage('$0 <command> [options]')
    .command('start [options]', 'Start the Jelly Bean app', (yargs) => {
        yargs.option('debug', {
            describe: 'Enable Electron console logging',
            type: 'boolean',
            default: false,
        });
    }, (argv) => {
        const electronPath = require('electron');
        const appPath = path.join(__dirname, 'electron.js');
        const args = argv.debug ? [appPath, '--debug'] : [appPath];
        spawn(electronPath, args, { stdio: 'inherit' });
    })
    .command('quit', 'Quit the Jelly Bean app', () => {
        // Implement logic to quit the Electron app
    })
    .command('devtools', 'Open Developer Tools', () => {
        const electronPath = require('electron');
        const { app } = require('electron');
        const { spawn } = require('child_process');

        const electronAppPath = path.join(__dirname, 'electron.js');
        const devToolsArgs = [electronAppPath, '--enable-logging'];

        spawn(electronPath, devToolsArgs, { stdio: 'inherit' });
    })
    .demandCommand(1, 'Please provide a valid command.')
    .help()
    .version()
    .alias('h', 'help')
    .alias('v', 'version')
    .strict()
    .parse();
