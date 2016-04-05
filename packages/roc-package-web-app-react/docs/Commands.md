# Commands for `roc-package-web-app-react`

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
* [list-settings](#list-settings)
* [markdown-actions](#markdown-actions)
* [markdown-hooks](#markdown-hooks)
* [markdown-settings](#markdown-settings)
* [start](#start)

## list-settings
__Prints all the available settings that can be changed.__

```
roc-package-web-app-react list-settings
```

## markdown-actions
__Prints all the registered actions in a markdown format.__

```
roc-package-web-app-react markdown-actions
```

## markdown-hooks
__Prints all the registered hooks in a markdown format.__

```
roc-package-web-app-react markdown-hooks
```

## markdown-settings
__Prints all the available settings that can be changed in a markdown format.__

```
roc-package-web-app-react markdown-settings
```

## start
__Starts the current project.__

```
roc-package-web-app-react start [artifact]
```

### Arguments

| Name     | Description                   | Required | Type       | Default |
| -------- | ----------------------------- | -------- | ---------- | ------- |
| artifact | Path to an artifact to start. | No       | `Filepath` |         |

### Settings options
* [runtime](/packages/roc-package-web-app-react/docs/Settings.md#runtime)
