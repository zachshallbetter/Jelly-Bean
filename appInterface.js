const config = require('./config.json');
const ConfigHandler = require('./handlers/configHandler');
const SvgHandler = require('./handlers/SvgHandler');
const ColorHandler = require('./handlers/ColorHandler');

class AppInterface {
    constructor() {
        this.canvas = document.getElementById('jellyBeanCanvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.configHandler = new ConfigHandler(this.canvas);
        this.svgHandler = new SvgHandler();
        this.colorHandler = new ColorHandler();
        this.loadSvgToCanvas();
        this.canvas.addEventListener('click', this.toggleJellyBeanColor.bind(this));
        console.log('AppInterface constructor')
    }

    loadSvgToCanvas() {
        this.svgHandler.loadSvgToCanvas(this.ctx, 'jellyBean.svg', 48, 48);
    }

    toggleJellyBeanColor() {
        const currentColor = this.ctx.getImageData(0, 0, 1, 1).data;
        const redColor = [190, 30, 45, 255];
        const blueColor = [0, 0, 255, 255];

        if (this.colorHandler.colorsEqual(currentColor, redColor)) {
            this.svgHandler.changeSvgFillColor(this.ctx, 'jellyBean.svg', '#0000ff', 48, 48);
        } else {
            this.svgHandler.changeSvgFillColor(this.ctx, 'jellyBean.svg', '#be1e2d', 48, 48);
        }
    }
}

module.exports = AppInterface;
