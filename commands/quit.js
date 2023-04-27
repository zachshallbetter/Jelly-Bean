const { appConfig } = require('../appConfig');

module.exports = {
    command: 'quit',
    describe: 'Quit the Jelly Bean app',
    handler: () => {
        const { exec } = require('child_process');
        const command = process.platform === 'win32' ? 'taskkill /IM electron.exe /T /F' : 'pkill -f electron';
        exec(command, (error) => {
            if (error) {
                console.error(`Failed to quit Jelly Bean: ${error.message}`);
            } else {
                console.log('Jelly Bean has been terminated.');
            }
        });
    },
};
