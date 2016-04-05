# Actions for `roc-package-web-app-react-dev`

## Actions
* [roc-plugin-start](#roc-plugin-start)
  * [runtime](#runtime)
* [roc-package-web-app](#roc-package-web-app)
  * [resolver](#resolver)
  * [runtime](#runtime)
* [roc-plugin-react](#roc-plugin-react)
  * [react](#react)
* [roc-package-web-app-react](#roc-package-web-app-react)
  * [react](#react)
* [roc-package-base-dev](#roc-package-base-dev)
  * [afterClean](#afterClean)
  * [beforeClean](#beforeClean)
* [roc-package-webpack-dev](#roc-package-webpack-dev)
  * [build](#build)
  * [dev](#dev)
  * [webpack](#webpack)
* [roc-package-webpack-node-dev](#roc-package-webpack-node-dev)
  * [target](#target)
  * [watcher](#watcher)
  * [webpack](#webpack)
* [roc-package-webpack-web-dev](#roc-package-webpack-web-dev)
  * [target](#target)
  * [watcher](#watcher)
  * [webpack](#webpack)
* [roc-plugin-style-css](#roc-plugin-style-css)
  * [css](#css)
* [roc-plugin-browsersync](#roc-plugin-browsersync)
  * [browsersync](#browsersync)
* [roc-plugin-assets-images](#roc-plugin-assets-images)
  * [images](#images)
* [roc-package-web-app-dev](#roc-package-web-app-dev)
  * [devStarted](#devStarted)
  * [webpack](#webpack)
* [roc-plugin-react-dev](#roc-plugin-react-dev)
  * [react](#react)
* [roc-package-web-app-react-dev](#roc-package-web-app-react-dev)
  * [settings](#settings)
  * [webpack](#webpack)

## roc-plugin-start

### runtime

Adds the base runtime. Will resolve node paths and enable source map support.

__Connects to extension:__ `roc-plugin-start`  
__Connects to hook:__ `register-runtime`  

## roc-package-web-app

### resolver

__Connects to extension:__ `roc-plugin-start`  
__Connects to hook:__ `get-resolve-paths`  

### runtime

__Connects to extension:__ `roc-plugin-start`  
__Connects to hook:__ `register-runtime`  

## roc-plugin-react

### react

__Connects to extension:__ `roc-plugin-start`  
__Connects to hook:__ `get-resolve-paths`  

## roc-package-web-app-react

### react

__Connects to extension:__ `roc-plugin-start`  
__Connects to hook:__ `get-resolve-paths`  

## roc-package-base-dev

### afterClean

Runs after clean command is executed. Logs that the action has been completed successfully.

__Connects to extension:__ `roc-package-base-dev`  
__Connects to hook:__ `after-clean`  

### beforeClean

Runs before clean command is executed. Returns an array of strings that should be removed.

__Connects to extension:__ `roc-package-base-dev`  
__Connects to hook:__ `before-clean`  

## roc-package-webpack-dev

### build

Build with Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-build-command`  

### dev

Run in development mode using Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-dev-command`  

### webpack

Adds base Webpack configuration.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  

## roc-package-webpack-node-dev

### target

Adds __node__ as a valid Webpack target.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `get-webpack-targets`  

### watcher

Adds a watcher for automatic reload on change.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `create-watchers`  

### webpack

Adds configuration needed for building for Node.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  

## roc-package-webpack-web-dev

### target

Adds __web__ as a valid Webpack target.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `get-webpack-targets`  

### watcher

Adds a web watcher using Webpack Dev Server.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `create-watchers`  

### webpack

Adds configuration need for web builds for Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  

## roc-plugin-style-css

### css

Adds CSS support.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  

## roc-plugin-browsersync

### browsersync

Adds a Browsersync instance.

__Connects to extension:__ Not specified  
__Connects to hook:__ `server-started`  

## roc-plugin-assets-images

### images

Adds images support.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  

## roc-package-web-app-dev

### devStarted

__Connects to extension:__ Not specified  
__Connects to hook:__ `dev-process-created`  

### webpack

Adds needed configuration to being able to build web applications.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  

## roc-plugin-react-dev

### react

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  

## roc-package-web-app-react-dev

### settings

__Connects to extension:__ `roc`  
__Connects to hook:__ `update-settings`  

### webpack

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  
