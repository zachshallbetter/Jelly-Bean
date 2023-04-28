const { ipcRenderer } = require('electron');

// Function to handle selected text
function handleSelectedText(selectedText) {
    console.log(`Selected text: ${selectedText}`);
    ipcRenderer.send('text-selected', selectedText);
}

// Function to handle focused input field
function handleFocusedInput(inputElement) {
    console.log(`Input field focused: ${inputElement}`);
    ipcRenderer.send('input-focused', inputElement);
}

// Add event listener for 'selectionchange' event on the document object
document.addEventListener('selectionchange', () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        handleSelectedText(selectedText);
    }
});

// Add event listener for 'focus' event on input fields
document.querySelectorAll('input, textarea').forEach((inputElement) => {
    inputElement.addEventListener('focus', () => {
        handleFocusedInput(inputElement);
    });
});
