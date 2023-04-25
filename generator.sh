#!/bin/bash

mkdir -p my-widget-app/build
mkdir -p my-widget-app/public
mkdir -p my-widget-app/src/main
mkdir -p my-widget-app/src/settings
mkdir -p my-widget-app/src/plugins/plugin1
mkdir -p my-widget-app/src/plugins/plugin2
mkdir -p my-widget-app/src/components
mkdir -p my-widget-app/src/utils

touch my-widget-app/build/electron.js
touch my-widget-app/build/vite.config.js
touch my-widget-app/public/favicon.ico
touch my-widget-app/public/index.html
touch my-widget-app/src/main/index.css
touch my-widget-app/src/main/index.js
touch my-widget-app/src/main/App.vue
touch my-widget-app/src/settings/index.css
touch my-widget-app/src/settings/index.js
touch my-widget-app/src/settings/App.vue
touch my-widget-app/src/components/Widget.vue
touch my-widget-app/src/components/ListItem.vue
touch my-widget-app/src/components/SettingsPanel.vue
touch my-widget-app/src/utils/api.js
touch my-widget-app/package.json
touch my-widget-app/README.md
