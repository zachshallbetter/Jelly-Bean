class AppInterface {
    constructor() {
        this.canvas = document.getElementById('jellyBeanCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.loadSvgToCanvas();
        this.canvas.addEventListener('click', this.toggleJellyBeanColor.bind(this));
        console.log('AppInterface constructor')
    }

    async loadSvgToCanvas() {
        const svgResponse = await fetch('jellyBean.svg');
        const svgText = await svgResponse.text();
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.src = svgUrl;
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, 48, 48);
            URL.revokeObjectURL(svgUrl);
        };
    }

    toggleJellyBeanColor() {
        const currentColor = this.ctx.getImageData(0, 0, 1, 1).data;
        const redColor = [190, 30, 45, 255];
        const blueColor = [0, 0, 255, 255];

        if (this.colorsEqual(currentColor, redColor)) {
            this.changeSvgFillColor('#0000ff');
        } else {
            this.changeSvgFillColor('#be1e2d');
        }
    }

    async changeSvgFillColor(color) {
        const svgResponse = await fetch('jellyBean.svg');
        let svgText = await svgResponse.text();
        svgText = svgText.replace(/fill="[^"]*"/, `fill="${color}"`);

        const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.src = svgUrl;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, 48, 48);
            URL.revokeObjectURL(svgUrl);
        };
    }

    colorsEqual(color1, color2) {
        return color1.length === color2.length && color1.every((value, index) => value === color2[index]);
    }
}

module.exports = AppInterface;
