// devTools.js
const { BrowserWindow } = require('electron');

function createDevToolsWindow() {
    const devToolsWin = new BrowserWindow({
        width: 800,
        height: 600,
        visible: false,
        frame: false,
        transparent: true,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    devToolsWin.on('closed', () => {
        console.log('Developer Tools window closed');
    });

    return devToolsWin;
}

module.exports = {
    createDevToolsWindow,
};
