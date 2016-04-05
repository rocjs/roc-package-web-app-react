# Commands for `roc-package-web-app-react-dev`

## General Information
All commands can be called with some additional options as can be seen below.

### General options

| Name            | Description                                                                                                   | Required |
| --------------- | ------------------------------------------------------------------------------------------------------------- | -------- |
| -c, --config    | Path to configuration file, will default to roc.config.js in current working directory.                       | No       |
| -d, --directory | Path to working directory, will default to the current working directory. Can be either absolute or relative. | No       |
| -h, --help      | Output usage information.                                                                                     | No       |
| -V, --verbose   | Enable verbose mode.                                                                                          | No       |
| -v, --version   | Output version number.                                                                                        | No       |

## Commands
* [build](#build)
* [clean](#clean)
* [dev](#dev)
* [list-settings](#list-settings)
* [markdown-actions](#markdown-actions)
* [markdown-hooks](#markdown-hooks)
* [markdown-settings](#markdown-settings)
* [start](#start)

## build
__Build the current project.__

```
roc-package-web-app-react-dev build
```

### Settings options
* [build](/packages/roc-package-web-app-react-dev/docs/Settings.md#build)

## clean
__Cleans the current project.__

```
roc-package-web-app-react-dev clean
```

### Settings options
* [build](/packages/roc-package-web-app-react-dev/docs/Settings.md#build)

## dev
__Starts the current project in development mode.__

```
roc-package-web-app-react-dev dev
```

### Settings options
_All groups are available._
* [build](/packages/roc-package-web-app-react-dev/docs/Settings.md#build)
* [dev](/packages/roc-package-web-app-react-dev/docs/Settings.md#dev)
* [runtime](/packages/roc-package-web-app-react-dev/docs/Settings.md#runtime)

## list-settings
__Prints all the available settings that can be changed.__

```
roc-package-web-app-react-dev list-settings
```

## markdown-actions
__Prints all the registered actions in a markdown format.__

```
roc-package-web-app-react-dev markdown-actions
```

## markdown-hooks
__Prints all the registered hooks in a markdown format.__

```
roc-package-web-app-react-dev markdown-hooks
```

## markdown-settings
__Prints all the available settings that can be changed in a markdown format.__

```
roc-package-web-app-react-dev markdown-settings
```

## start
__Starts the current project.__

```
roc-package-web-app-react-dev start [artifact]
```

### Arguments

| Name     | Description                   | Required | Type       | Default |
| -------- | ----------------------------- | -------- | ---------- | ------- |
| artifact | Path to an artifact to start. | No       | `Filepath` |         |

### Settings options
* [runtime](/packages/roc-package-web-app-react-dev/docs/Settings.md#runtime)
