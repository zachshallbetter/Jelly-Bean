const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    setWindowPosition: (x, y) => {
        ipcRenderer.send('set-window-position', x, y);
    },
});