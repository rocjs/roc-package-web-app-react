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
* [start](#start)
* [meta](#meta)
    * [docs](#docs)
    * [list-settings](#list-settings)

## start
__Starts the current project.__

```
roc start [artifact]
```

### Arguments
| Name     | Description                   | Default | Type       | Required | Can be empty |
| -------- | ----------------------------- | ------- | ---------- | -------- | ------------ |
| artifact | Path to an artifact to start. |         | `Filepath` | No       | Yes          |

###  Settings options
* [runtime](/Users/gustaf/VG/public/roc-package/roc-package-web-app-react/extensions/roc-package-web-app-react/docs/Settings.md#runtime)

###  Defined by extensions
roc-plugin-start

## meta
__Meta commands__

```
roc meta <command>
```
Meta commands that can be used to generate meta data about the current project.


### docs
__Generates documentation for the current project.__

```
roc meta docs
```

#### Command options
| Name            | Description | Default        | Type | Required | Can be empty |
| --------------- | ----------- | -------------- | ---- | -------- | ------------ |
| --hide-commands |             |                |      | No       | Yes          |
| --html          |             | `false`        |      | No       | Yes          |
| --markdown      |             | `true`         |      | No       | Yes          |
| --mode          |             | `"github.com"` |      | No       | Yes          |
| --output        |             | `"docs"`       |      | No       | Yes          |

####  Defined by extensions
roc

### list-settings
__Prints all the available settings that can be changed.__

```
roc meta list-settings
```

####  Defined by extensions
roc

