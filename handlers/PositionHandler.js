const fs = require('fs');

class PositionHandler {
    constructor(app, filename) {
        this.storedPosition = app.getPath('userData') + '/' + filename;
    }

    saveWindowPosition(position) {
        fs.writeFileSync(this.storedPosition, JSON.stringify(position));
    }

    getWindowPosition() {
        try {
            const position = JSON.parse(fs.readFileSync(this.storedPosition, 'utf8'));
            return Array.isArray(position) ? position : null;
        } catch (err) {
            return null;
        }
    }
}

module.exports = PositionManager;
