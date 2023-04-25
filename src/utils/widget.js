// Create a floating widget and set its functionality
const widget = document.createElement('div');
widget.id = 'jellybean-widget';
widget.style.position = 'fixed';
widget.style.zIndex = 9999;
widget.style.display = 'none';
widget.style.width = '100px';
widget.style.height = '100px';
widget.style.backgroundImage = 'url(/public/jelly-bean.svg)';
widget.style.backgroundSize = 'contain';
widget.style.backgroundRepeat = 'no-repeat';

widget.addEventListener('mousedown', (event) => {
    event.preventDefault();
    const offsetX = event.clientX - widget.getBoundingClientRect().left;
    const offsetY = event.clientY - widget.getBoundingClientRect().top;

    const onMouseMove = (event) => {
        widget.style.left = `${event.clientX - offsetX}px`;
        widget.style.top = `${event.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

widget.addEventListener('click', () => {
    ipcRenderer.send('widget-click');
});

document.body.appendChild(widget);
