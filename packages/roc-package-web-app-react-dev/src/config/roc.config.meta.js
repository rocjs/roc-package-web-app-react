import { isString, isBoolean, isPath, isArray } from 'roc/validators';

export default {
    settings: {
        descriptions: {
            build: {
                routes: 'The routes to use if no entry file is given, will use default entry files internally.',
                useDefaultRoutes: 'If Roc should use an internal wrapper around the routes, please look at the ' +
                    'documentation for more details.',

                reducers: 'The reducers to use if no entry file is given, will use default entry files internally.',
                useDefaultReducers: 'If Roc should use internally defined reducers, please look at the documentation ' +
                    ' for what reducers that are included.',

                reduxMiddlewares: 'The middlewares to use if no entry file is given, will use default entry files ' +
                    'internally.',
                useDefaultReduxMiddlewares: 'If Roc should use internally defined middlewares, please look at the ' +
                    ' documentation for what middlewares that are included.',

                clientLoading: 'The React component to use on the first client load while fetching data, will only ' +
                    'be used if some blocking hooks are defined.'
            },
            dev: {
                a11y: 'If A11Y validation should be active. Currently it´s suggested to not enable reduxDevtools ' +
                    'with this.',
                reduxDevtools: {
                    enabled: 'If Redux Devtools should be enabled.',
                    position: 'Starting position of the Devtools, can be left, right, top or bottom.',
                    size: 'Default size of the Devtools, should be a number between 0 and 1.',
                    visibilityKey: 'The key that should toogle the Redux Devtools, will be combine with CTRL.',
                    positionKey: 'The key that should change position of the Redux Devtools, will be combine with ' +
                        'CTRL.',
                    defaultVisible: 'If the Redux Devtools should be shown by default.',
                    theme: 'The theme to use for the Redux Devtools, see ' +
                        'https://github.com/gaearon/redux-devtools-themes.'
                },
                reduxLogger: {
                    level: 'The logging level for Redux Logger, can be either warn, error or info.',
                    collapsed: 'If the logged actions by Redux Logger should be collapsed by default.',
                    duration: 'If Redux Logger should print the duration of each action.',
                    timestamp: 'If Redux Logger should print the timestamp with each action.'
                },
                yellowbox: {
                    enabled: 'If YellowBox should be enabled.',
                    ignore: 'Array of prefix strings that should be ignored by YellowBox.'
                }
            }
        },

        validations: {
            build: {
                routes: isPath,
                useDefaultRoutes: isBoolean,

                reducers: isPath,
                useDefaultReducers: isBoolean,

                reduxMiddlewares: isPath,
                useDefaultReduxMiddlewares: isBoolean,

                clientLoading: isPath
            },
            dev: {
                a11y: isBoolean,
                reduxDevtools: {
                    enabled: isBoolean,
                    position: /^left|right|top|bottom$/,
                    size: (input) => input >= 0 && input <= 1,
                    visibilityKey: isString,
                    positionKey: isString,
                    defaultVisible: isBoolean,
                    theme: isString
                },
                reduxLogger: {
                    level: /^warn|error|info$/,
                    collapsed: isBoolean,
                    duration: isBoolean,
                    timestamp: isBoolean
                },
                yellowbox: {
                    enabled: isBoolean,
                    ignore: isArray(isString)
                }
            }
        }
    }
};
