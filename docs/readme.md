# Jelly Bean

Jelly Bean is a user-friendly desktop application that assists users in managing their clipboard and providing context-aware recommendations based on their text selections or input field focus. The application is designed to enhance productivity and streamline the process of copying and pasting text, catering to users who frequently perform these actions.

## Features

- Floating widget: A draggable, always-on-top component displaying recommendations and clipboard history.
- Text event listeners: Monitors text selection and input field focus events to trigger recommendations.
- API integration: Fetches recommendations from a backend service.
- Clipboard management: Stores and organizes copied text for easy access and pasting.
- Settings panel: Allows users to manage plugins and customize the widget's appearance.
- Plugin architecture: Enables developers to extend the app's functionality through custom plugins.

## In-Process TODO

- Implement text event listeners to monitor text selection and input field focus events.
- Integrate with the backend API to fetch recommendations.
- Implement the plugin architecture to allow developers to extend the app's functionality.
- (Add any other tasks that are in progress or planned.)

## Dependencies

- Electron: A framework for creating native desktop applications using web technologies.
- electron-reload: A package for implementing auto-reloading during development.
- yargs: A library for building command-line interfaces.
- global-modules: A package to get the path to the global `node_modules` directory.

## Setup

`npm install`
1. Start the Jelly Bean app:
`npm start`


## Command List

| Command       | Description                      | Example Usage   |
|---------------|----------------------------------|-----------------|
| `bean start`  | Start the Jelly Bean app         | `bean start`    |
| `bean quit`   | Quit the Jelly Bean app          | `bean quit`     |
| `bean --help` | Display help information         | `bean --help`   |
| `bean --version` | Display version information   | `bean --version`|

## Workflow

1. User selects text in a document or focuses on an input field.
2. Jelly Bean displays relevant recommendations in the floating widget.
3. User can copy the text or choose an item from their clipboard history to paste into the input field.

## Contributing

Contributions to the Jelly Bean project are welcome! Please refer to the `CONTRIBUTING.md` file for guidelines on how to contribute to the project.

## License

This project is licensed under the ISC License. See the `LICENSE` file for more information.
