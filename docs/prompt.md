"Hello, ChatGPT. I've previously worked with you on a desktop widget project using Electron and Vite, where we were implementing a floating interface with extensible plugins, settings panel, and other features. My name is Zach, and I'm the Implementer. In our previous conversations, we established the following rules and requests:

Keep the conversation focused and avoid repeating information.
Refer back to previous instructions when needed.
Provide code snippets with line numbers when applicable.
Maintain a casual and friendly tone.
Can you please help me continue working on the project and provide guidance on the next steps while adhering to these rules and requests?"

By using this prompt, we'll be able to resume our collaboration while keeping in mind the specifications and preferences you've mentioned. You will need ask questions after each response to keep the conversation going. You can also provide code snippets with line numbers when applicable.

# Jelly Bean Project - Language Model Save Point

Here's a sample prompt.md file that is used as a "save point" for my conversation with a language model. This file contains a summary of the project and key information discussed so far:

I  can use this prompt.md file to quickly restore the context of your conversation with the language model in case you need to start a new chat or continue the conversation at a later time. Simply copy and paste the contents of this file into the chat to bring the model up to speed.

Here's a prompt that includes your requests, specifications, and rules from our conversation for resuming the collaboration on the desktop widget project:

## Project Overview

Jelly Bean is a user-friendly desktop application that assists users in managing their clipboard and providing context-aware recommendations based on their text selections or input field focus. The application is built using the Electron framework, with vanilla JavaScript and HTML/CSS for the frontend. The app has a main process (`electron.js`) and renderer processes for the widget and settings panel. The backend consists of an API for fetching recommendations, while the app stores user settings and clipboard history locally. Electron features, such as native menus, system notifications, and tray icons, are also integrated.

## Key Components

- Floating widget: A draggable, always-on-top component displaying recommendations and clipboard history.
- Text event listeners: Monitors text selection and input field focus events to trigger recommendations.
- API integration: Fetches recommendations from a backend service.
- Clipboard management: Stores and organizes copied text for easy access and pasting.
- Settings panel: Allows users to manage plugins and customize the widget's appearance.
- Plugin architecture: Enables developers to extend the app's functionality through custom plugins.

## CLI and Electron App

The Jelly Bean application includes a Command Line Interface (CLI) called `$bean`. The CLI allows users to interact with and control the application through the command line, providing a convenient way to start, quit, or manage the app without relying on the GUI. The CLI is implemented in the `cli.js` file and uses the `yargs` library to parse command line arguments and handle various commands.

The Electron app is implemented in the `electron.js` file and is responsible for creating the BrowserWindow instance and managing the app's behavior. The floating widget is rendered in the `index.html` file, and the `collectInfo.js` file is intended to implement text event listeners.

## Recent Discussion

We discussed the implementation of the CLI and its integration with the floating widget. We also reviewed the project structure and provided recommendations for implementing text event listeners, inter-process communication (IPC), and connecting CLI commands to widget actions. Finally, we created a `README.md` file for the project, which includes a command list, dependencies, workflow, setup, description, features, in-process TODO, and other relevant information.

## Next Steps

- Implement text event listeners to monitor text selection and input field focus events.
- Integrate with the backend API to fetch recommendations.
- Implement the plugin architecture to allow developers to extend the app's functionality.
- (Add any other tasks that are in progress or planned.)

## Folder Structure

jellyBean.svg - 
appConfig.json - 
index.html - 
collectInfo.js - 
main.js - 
appInterface.js - 
package.json - 
electron.js - 
cli.js - 
positionManager.js - 

## End of Save Point
