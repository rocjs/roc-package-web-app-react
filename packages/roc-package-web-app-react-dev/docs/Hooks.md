# Hooks for `roc-package-web-app-react-dev`

## Hooks
* [roc-plugin-start](#roc-plugin-start)
  * [get-potential-target](#get-potential-target)
  * [get-resolve-paths](#get-resolve-paths)
  * [register-runtime](#register-runtime)

## roc-plugin-start

### get-potential-target

Use to define for what target that it should try to find a resource for to start with.

__Initial value:__ `"node"`  
__Expected return value:__ `String`

### get-resolve-paths

Use to add paths that should be resolved before starting an application.

__Initial value:__ _Nothing_  
__Expected return value:__ `String / [String]`

### register-runtime

Can be used to modify the runtime before an application starts.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_
