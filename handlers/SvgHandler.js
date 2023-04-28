class SvgHandler {
    async loadSvgToCanvas(ctx, url, width, height) {
        const svgResponse = await fetch(url);
        const svgText = await svgResponse.text();
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.src = svgUrl;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(svgUrl);
        };
    }

    async changeSvgFillColor(ctx, url, color, width, height) {
        const svgResponse = await fetch(url);
        let svgText = await svgResponse.text();
        svgText = svgText.replace(/fill="[^"]*"/, `fill="${color}"`);

        const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.src = svgUrl;
        img.onload = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(svgUrl);
        };
    }
}

module.exports = SvgHandler;
