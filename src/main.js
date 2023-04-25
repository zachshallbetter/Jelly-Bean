import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')


# Create App.vue file
cat << EOF > src/App.vue
<template>
  <div id="app">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'JellyBean App',
    }
  },
}
</script>
