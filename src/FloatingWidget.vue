<template>
  <object
    id="jellybean-widget"
    type="image/svg+xml"
    data="/jelly-bean.svg"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    style="
      position: fixed;
      z-index: 9999;
      left: 0;
      top: 0;
      width: 100px;
      height: 100px;
      cursor: move;
    "
  ></object>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  methods: {
    handleMouseDown() {
      const widget = document.getElementById('jellybean-widget')
      widget.addEventListener('mousemove', this.handleMouseMove)
    },
    handleMouseMove(event) {
      ipcRenderer.send('selection-mousedown', event.clientX, event.clientY)
    },
    handleMouseUp() {
      const widget = document.getElementById('jellybean-widget')
      widget.removeEventListener('mousemove', this.handleMouseMove)
    },
  },
}
</script>
