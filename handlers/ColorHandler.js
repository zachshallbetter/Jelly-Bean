class ColorHandler {
    colorsEqual(color1, color2) {
        return color1.length === color2.length && color1.every((value, index) => value === color2[index]);
    }
}

module.exports = ColorHandler;
