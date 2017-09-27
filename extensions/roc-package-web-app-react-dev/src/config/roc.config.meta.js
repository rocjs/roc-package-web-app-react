import { isString, isBoolean, isPath, isArray, notEmpty, isInteger, required } from 'roc/validators';

export default {
    settings: {
        build: {
            input: {
                web: {
                    override: 'roc-package-web-app-dev',
                    description: 'The web/client entry point file.',
                    validator: notEmpty(isPath),
                },
                node: {
                    override: 'roc-package-web-app-dev',
                    description: 'The node/server entry point file.',
                    validator: notEmpty(isPath),
                },
            },
            useReactRouterScrollAsync: {
                description: 'Use react-router-scroll-async middleware to help with scroll behavior for ' +
                    'Single Page Applications. Disable this if SPA functionality is turned off.',
                validator: required(isBoolean),
            },
            routes: {
                description: 'The routes to use if no entry file is given, will use default entry files internally.',
                validator: notEmpty(isPath),
            },
            useDefaultRoutes: {
                description: 'If Roc should use an internal wrapper around the routes, please look at the ' +
                    'documentation for more details.',
                validator: required(isBoolean),
            },
            reducers: {
                description: 'The reducers to use if no entry file is given, will use default entry ' +
                    'files internally.',
                validator: notEmpty(isPath),
            },
            redux: {
                useDefaultReducers: {
                    description: 'If Roc should use internally defined reducers, please look at the documentation ' +
                        ' for what reducers that are included.',
                    validator: required(isBoolean),
                },
                middlewares: {
                    description: 'The middlewares to use if no entry file is given, will use default entry files ' +
                        'internally.',
                    validator: notEmpty(isPath),
                },
                enhancers: {
                    description: 'The enhancers to use if no entry file is given, will use default entry files ' +
                        'internally.',
                    validator: notEmpty(isPath),
                },
                useDefaultMiddlewares: {
                    description: 'If Roc should use internally defined middlewares, please look at the ' +
                    ' documentation for what middlewares that are included.',
                    validator: required(isBoolean),
                },
                sagas: {
                    description: 'The Redux Saga to use as the root saga.',
                    validator: notEmpty(isPath),
                },
            },
            i18n: {
                usePolyfill: {
                    description: 'If Roc should load Intl polyfill and locales on client and server.',
                },
                locales: {
                    description: 'List of locales polyfills to load on the client - these are listed in the ' +
                                 'intl package (see node_modules/intl/locale-date/jsonp/.',
                },
            },
            clientLoading: {
                description: 'The React component to use on the first client load while fetching data, will only ' +
                'be used if some blocking hooks are defined.',
                validator: notEmpty(isPath),
            },

            templateValues: {
                description: '[UNDOCUMENTED]',
            },
        },
        dev: {
            a11y: {
                description: 'If A11Y validation should be active. Currently it´s suggested to not ' +
                'enable Redux Devtools with this.',
                validator: required(isBoolean),
            },
            redux: {
                devTools: {
                    enabled: {
                        description: 'If Redux Devtools should be enabled.',
                        validator: required(isBoolean),
                    },
                    dockMonitor: {
                        defaultPosition: {
                            description: 'Starting position of the Devtools, can be left, right, top or bottom.',
                            validator: required(/^left|right|top|bottom$/),
                        },
                        defaultSize: {
                            description: 'Default size of the Devtools, should be a number between 0 and 1.',
                            validator: (input) => input >= 0 && input <= 1,
                        },
                        toggleVisibilityKey: {
                            description: 'The key that should toogle the Redux Devtools, will be combine with CTRL.',
                            validator: required(isString),
                        },
                        changePositionKey: {
                            description: 'The key that should change position of the Redux Devtools.',
                            validator: required(isString),
                        },
                        defaultIsVisible: {
                            description: 'If the Redux Devtools should be shown by default.',
                            validator: required(isBoolean),
                        },
                    },
                    instrument: {
                        maxAge: {
                            description: 'Maximum allowed actions to be stored on the history tree. Good if ' +
                                'the application generates a lot of actions.',
                            validator: isInteger,
                        },
                    },
                    logMonitor: {
                        theme: {
                            description: 'The theme to use for the Redux Devtools, see ' +
                            'https://github.com/gaearon/redux-devtools-themes for the available ones.',
                            validator: isString,
                        },
                    },
                },

                logger: {
                    level: {
                        description: 'The logging level for Redux Logger, can be either warn, error or info.',
                        validator: required(/^warn|error|info$/),
                    },
                    collapsed: {
                        description: 'If the logged actions by Redux Logger should be collapsed by default.',
                        validator: required(isBoolean),
                    },
                    duration: {
                        description: 'If Redux Logger should print the duration of each action.',
                        validator: required(isBoolean),
                    },
                    timestamp: {
                        description: 'If Redux Logger should print the timestamp with each action.',
                        validator: required(isBoolean),
                    },
                },
            },

            yellowbox: {
                enabled: {
                    description: 'If YellowBox should be enabled.',
                    validator: isBoolean,
                },
                ignore: {
                    description: 'Array of prefix strings that should be ignored by YellowBox.',
                    validator: isArray(isString),
                },
            },
        },
    },
};
