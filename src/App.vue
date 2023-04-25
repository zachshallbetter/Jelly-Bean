<template>
  <div id="app">
    <FloatingWidget />
  </div>
</template>

<script>
import FloatingWidget from './FloatingWidget.vue'

export default {
  components: {
    FloatingWidget,
  },
}
</script>

<style>
body {
  margin: 0;
  background-color: transparent;
  user-select: none;
}
</style>
