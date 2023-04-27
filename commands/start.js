const path = require('path');
const { spawn } = require('child_process');
const appConfig = require('../appConfig.json');

module.exports = {
    command: 'start [options]',
    describe: 'Start the Jelly Bean app',
    builder: (yargs) => {
        yargs.option('debug', {
            describe: 'Enable Electron console logging',
            type: 'boolean',
            default: false,
        });
    },
    handler: (argv) => {
        const electronPath = require('electron');
        const appPath = path.join(__dirname, '..', appConfig.entry);

        const proc = spawn(electronPath, [appPath], { stdio: 'inherit' });

        if (argv.debug) {
            proc.stdout.on('data', (data) => {
                console.log(`Electron: ${data}`);
            });
            proc.stderr.on('data', (data) => {
                console.error(`Electron: ${data}`);
            });
        }

        proc.on('close', () => {
            process.exit();
        });
    },

};
