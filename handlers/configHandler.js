const { ipcRenderer } = require('electron');

class ConfigHandler {
    constructor(canvas) {
        this.canvas = canvas;

        ipcRenderer.on('config', (event, config) => {
            this.canvas.width = config.width;
            this.canvas.height = config.height;
        });
    }
}

module.exports = ConfigHandler;
