<template>
  <div class="floating-widget" :style="style">
    <!-- Your floating widget content goes here -->
  </div>
</template>

<script>
export default {
  computed: {
    style() {
      return {
        position: 'fixed',
        top: this.$store.state.widgetPosition.top + 'px',
        left: this.$store.state.widgetPosition.left + 'px',
        zIndex: 9999,
      }
    },
  },
}
</script>

<style scoped>
.floating-widget {
  /* Add your custom styling for the floating widget */
}
</style>
