const { app, BrowserWindow, ipcMain } = require('electron');
const topOption = process.argv.includes('--top=true');
const enableLogging = process.argv.includes('--enable-logging');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

// Use electron-reload for auto-reloading during development
if (isDevelopment) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    });
}

// Create a BrowserWindow instance
function createWindow() {
    const win = new BrowserWindow({
        width: 170,
        height: 150,
        frame: false,
        transparent: true,
        alwaysOnTop: topOption,
        background: '#00000000',
        maximizable: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'main.js'),
        },
    });

    win.loadFile('index.html');
    win.setIgnoreMouseEvents(false);
    win.setBackgroundColor('#00000000');

    win.on('closed', () => {
        app.quit();
    });

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

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    app.on('ready', () => {
        createWindow();

        if (enableLogging) {
            console.log('Logging is enabled');
        }
    });
}