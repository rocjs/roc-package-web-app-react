# Actions for `roc-package-web-app-react-dev`

## Actions
* [roc-abstract-package-base-dev](#roc-abstract-package-base-dev)
  * [after-clean](#after-clean)
  * [before-clean](#before-clean)
* [roc-plugin-babel](#roc-plugin-babel)
  * [babel-config](#babel-config)
* [roc-package-webpack-dev](#roc-package-webpack-dev)
  * [babel-config](#babel-config-1)
  * [build-webpack](#build-webpack)
  * [run-build-command](#run-build-command)
  * [run-dev-command](#run-dev-command)
* [roc-package-webpack-node-dev](#roc-package-webpack-node-dev)
  * [build-webpack](#build-webpack-1)
  * [create-watchers](#create-watchers)
  * [get-webpack-targets](#get-webpack-targets)
* [roc-package-webpack-web-dev](#roc-package-webpack-web-dev)
  * [build-webpack](#build-webpack-2)
  * [create-watchers](#create-watchers-1)
  * [get-webpack-targets](#get-webpack-targets-1)
* [roc-plugin-browsersync](#roc-plugin-browsersync)
  * [server-started](#server-started)
* [roc-plugin-style-css](#roc-plugin-style-css)
  * [build-webpack](#build-webpack-3)
* [roc-plugin-assets-images](#roc-plugin-assets-images)
  * [build-webpack](#build-webpack-4)
* [roc-package-web-app-dev](#roc-package-web-app-dev)
  * [build-webpack](#build-webpack-5)
  * [dev-process-created](#dev-process-created)
* [roc-plugin-react-dev](#roc-plugin-react-dev)
  * [babel-config](#babel-config-2)
* [roc-package-web-app-react-dev](#roc-package-web-app-react-dev)
  * [build-webpack](#build-webpack-6)
  * [update-settings](#update-settings)

## roc-abstract-package-base-dev

### after-clean

Runs after clean command is executed. Logs that the action has been completed successfully.

__Connects to extension:__ `roc-abstract-package-base-dev`  
__Connects to hook:__ `after-clean`  
__Have post:__ No  

### before-clean

Runs before clean command is executed. Returns an array of paths that should be removed.

__Connects to extension:__ `roc-abstract-package-base-dev`  
__Connects to hook:__ `before-clean`  
__Have post:__ No  

## roc-plugin-babel

### babel-config

Base Babel configuration

__Connects to extension:__ Not specified  
__Connects to hook:__ `babel-config`  
__Have post:__ Yes  

## roc-package-webpack-dev

### babel-config

__Connects to extension:__ Not specified  
__Connects to hook:__ `babel-config`  
__Have post:__ No  

### build-webpack

Adds base Webpack configuration and read webpack from the configuration.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  
__Have post:__ Yes  

### run-build-command

Build with Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-build-command`  
__Have post:__ No  

### run-dev-command

Run in development mode using Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-dev-command`  
__Have post:__ No  

## roc-package-webpack-node-dev

### build-webpack

Adds configuration needed for building for Node.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  
__Have post:__ No  

### create-watchers

Adds a watcher for automatic reload on change.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `create-watchers`  
__Have post:__ No  

### get-webpack-targets

Adds __node__ as a valid Webpack target.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `get-webpack-targets`  
__Have post:__ No  

## roc-package-webpack-web-dev

### build-webpack

Adds configuration need for web builds for Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  
__Have post:__ No  

### create-watchers

Adds a web watcher using Webpack Dev Server.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `create-watchers`  
__Have post:__ No  

### get-webpack-targets

Adds __web__ as a valid Webpack target.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `get-webpack-targets`  
__Have post:__ No  

## roc-plugin-browsersync

### server-started

Adds a Browsersync instance.

__Connects to extension:__ Not specified  
__Connects to hook:__ `server-started`  
__Have post:__ No  

## roc-plugin-style-css

### build-webpack

Adds CSS support.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  
__Have post:__ No  

## roc-plugin-assets-images

### build-webpack

Adds image support. Also makes `url-loader` and `file-loader` available in the module scope.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  
__Have post:__ No  

## roc-package-web-app-dev

### build-webpack

Adds needed configuration to being able to build web applications.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  
__Have post:__ No  

### dev-process-created

__Connects to extension:__ Not specified  
__Connects to hook:__ `dev-process-created`  
__Have post:__ No  

## roc-plugin-react-dev

### babel-config

Adds the needed Babel configuration to be able to build and develop React code.

__Connects to extension:__ Not specified  
__Connects to hook:__ `babel-config`  
__Have post:__ No  

## roc-package-web-app-react-dev

### build-webpack

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  
__Have post:__ No  

### update-settings

__Connects to extension:__ `roc`  
__Connects to hook:__ `update-settings`  
__Have post:__ No  
