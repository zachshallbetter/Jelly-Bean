#!/bin/bash

# Create the necessary directories
mkdir -p app assets commands core features/jellyBean middlewares utils

# Move the main files into the app folder
mv appConfig.json index.html app/

# Move the assets into the assets folder
mv jelly-bean.png jellyBean.svg assets/

# Move the CLI and Electron files into the core folder
mv cli.js electron.js core/

# Move the Jelly Bean related files into the features/jellyBean folder
mv appInterface.js positionManager.js features/jellyBean/

# Move the middleware file into the middlewares folder
mv collectInfo.js middlewares/

# Don't forget to manually update the import and require statements in your JavaScript files
echo "Don't forget to manually update the import and require statements in your JavaScript files."
