#!/bin/bash

# Initialize the project
npm init -y

# Install Vite, Vercel, Electron, and other dependencies
npm install vite @vitejs/plugin-vue vercel electron electron-builder dotenv

# Create .env file
echo "JELLYBEAN_TITLE=JellyBean App" >> .env
echo "RECOMMENDATION_API_KEY=your_api_key_here" >> .env
echo "OTHER_API_KEY=another_api_key_here" >> .env

# Create project folders
mkdir src public

# Create Vite configuration file
cat << EOF > vite.config.js
const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

module.exports = defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    target: 'esnext',
    rollupOptions: {
      external: require('module').builtinModules,
    },
  },
})
EOF

# Create main process file
cat << EOF > electron.js
const { app, BrowserWindow } = require('electron')
const path = require('path')

require('dotenv').config()

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('public/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
EOF

# Create preload file
touch src/preload.js

# Create index.html file
cat << EOF > public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" href="/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JellyBean App</title>
</head>
<body>
  <div id="app"></div>
  <script src="/src/main.js"></script>
</body>
</html>
EOF

# Create main.js file
cat << EOF > src/main.js
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
EOF

# Create .gitignore file
cat << EOF > .gitignore
node_modules/
dist/
.env
EOF

# Initialize Git repository
git init
git add .
git commit -m "Initial commit"

echo "Project initialized successfully!"