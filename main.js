const { ipcRenderer } = require('electron');
const AppInterface = require('./appInterface');

window.addEventListener('DOMContentLoaded', () => {
    const appInterface = new AppInterface();

    appInterface.toggleJellyBeanColor();
});
