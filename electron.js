const config = require('./config.json');
const { app, BrowserWindow, ipcMain } = require('electron');
const { createDevToolsWindow } = require('./devTools');
const enableLogging = process.argv.includes('--enable-logging');
const path = require('path');
// const topOption = process.argv.includes('--top=true');

const isDevelopment = !config.debug;

// Use electron-reload for auto-reloading during development
if (isDevelopment) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    });
}

app.on('ready', () => {
    createWindow();

    if (enableLogging) {
        createDevToolsWindow();
        console.log('Logging is enabled');
    }
});

// Create a BrowserWindow instance
function createWindow() {
    const win = new BrowserWindow({
        width: 170,
        height: 150,
        frame: false,
        transparent: true,
        alwaysOnTop: config.alwaysOnTop,
        background: '#00000000',
        maximizable: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false, // Re-enable webSecurity
            preload: path.join(__dirname, 'main.js'),
        },

    });

    win.loadFile('index.html');
    win.setIgnoreMouseEvents(false);
    win.setBackgroundColor('#00000000');

    win.on('closed', () => {
        app.quit();
    });

    // Listen for 'text-selected' event
    ipcMain.on('text-selected', (event, selectedText) => {
        console.log('Text selected in renderer process:', selectedText);
        // Here, you can perform any necessary action with the selected text, e.g., fetch recommendations
    });

    // Listen for 'input-focused' event
    ipcMain.on('input-focused', (event, inputElement) => {
        console.log('Input field focused in renderer process:', inputElement);
        // Here, you can perform any necessary action when an input field is focused
    });

    if (enableLogging) {
        win.webContents.openDevTools({ mode: 'detach' });
    }

    return win;
}

// Ensure only one instance of the application is running
const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        app.quit();
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
