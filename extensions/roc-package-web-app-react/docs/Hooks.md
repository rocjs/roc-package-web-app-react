# Hooks for `roc-package-web-app-react`

## Hooks
* [roc](#roc)
  * [update-settings](#update-settings)
* [roc-plugin-start](#roc-plugin-start)
  * [get-potential-target](#get-potential-target)
  * [register-runtime](#register-runtime)

## roc

### update-settings

Expected to return new settings that should be merged with the existing ones.

Makes it possible to modify the settings object before a command is started and after potential arguments from the command line and configuration file have been parsed. This is a good point to default to some value if no was given or modify something in the settings.

__Initial value:__ _Nothing_  
__Expected return value:__ `Object()`

#### Arguments

| Name        | Description                                                                  | Type       | Required | Can be empty |
| ----------- | ---------------------------------------------------------------------------- | ---------- | -------- | ------------ |
| getSettings | A function that returns the settings after the context has been initialized. | `Function` | No       |              |

## roc-plugin-start

### get-potential-target

Use to define for what target that it should try to find a resource for too start with.

__Initial value:__ `"node"`  
__Expected return value:__ `String`

### register-runtime

Can be used to modify the runtime before an application starts.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_

#### Arguments

| Name    | Description | Type      | Required | Can be empty |
| ------- | ----------- | --------- | -------- | ------------ |
| verbose |             | `Boolean` | No       |              |
