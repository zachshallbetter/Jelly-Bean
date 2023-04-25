const { ipcRenderer } = require('electron');

function getSelectionText() {
    const selection = window.getSelection();
    return selection.toString();
}

document.addEventListener('selectionchange', () => {
    const selection = getSelectionText();
    ipcRenderer.send('selection-change', selection);
});

document.addEventListener('mousedown', (event) => {
    const selection = getSelectionText();
    if (selection) {
        ipcRenderer.send('selection-mousedown', event.clientX, event.clientY);
    }
});
