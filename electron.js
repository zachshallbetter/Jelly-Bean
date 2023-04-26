const { app, BrowserWindow, ipcMain, menu } = require('electron');
const path = require('path');
const { createServer } = require('vite');

// Handle Squirrel events for Windows
if (require('electron-squirrel-startup')) return;

require('dotenv').config();

async function createWindow() {
    // Create Vite server for development
    const server = await createServer({
        publicDir: path.resolve(__dirname, 'public'),
    });
    await server.listen();

    const win = new BrowserWindow({
        width: 120,
        height: 120,
        frame: true,
        transparent: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Load the Vite server URL
    const urlToLoad = server.config.base + 'index.html';
    console.log('URL to load:', urlToLoad);
    win.loadURL(urlToLoad);

    // Uncomment this line for development to open DevTools
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('selection-change', (event, selection) => {
    // Handle text selection changes here
    console.log(selection);
});

ipcMain.on('selection-mousedown', (event, x, y) => {
    // Update widget position
    const mainWindow = BrowserWindow.getFocusedWindow();
    console.log('Widget position:', x, y);
    if (mainWindow) {
        mainWindow.webContents.send('widget-position', x, y);
    }
});

ipcMain.on('widget-click', () => {
    // Handle widget click event
    console.log('Widget clicked');
});
