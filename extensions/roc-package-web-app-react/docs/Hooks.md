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

__Initial value:__ _Nothing_  
__Expected return value:__ `{}`

#### Arguments
| Name        | Description                                                                  | Type       | Required | Can be empty |
| ----------- | ---------------------------------------------------------------------------- | ---------- | -------- | ------------ |
| getSettings | A function that returns the settings after the context has been initialized. | `Function` | No       | Yes          |

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
| verbose |             | `Boolean` | No       | Yes          |
