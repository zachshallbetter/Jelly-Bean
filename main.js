const { ipcRenderer } = require('electron');
const AppInterface = require('./appInterface');

window.addEventListener('DOMContentLoaded', () => {
    // Get system info
    const appInterface = new AppInterface();

    appInterface.toggleJellyBeanColor();
});
