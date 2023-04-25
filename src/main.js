import { createApp } from 'vue'
import App from './App.vue'
import FloatingWidget from './FloatingWidget.vue'
import store from './store'

const app = createApp(App)
app.provide('store', store)
app.component('FloatingWidget', FloatingWidget)
app.mount('#app')
