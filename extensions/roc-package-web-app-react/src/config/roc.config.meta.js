import { isString, isBoolean, isPath, isArray, isObject, notEmpty, required } from 'roc/validators';

export default {
    settings: {
        runtime: {
            head: {
                __meta: {
                    description: 'Settings that will be used with React Helmet. https://github.com/nfl/react-helmet',
                },
                base: {
                    __meta: {
                        description: 'Base tag to be used in <head>.',
                    },
                    href: {
                        description: 'The document base address from which relative links are made.',
                        validator: notEmpty(isString),
                    },
                    target: {
                        description: 'The browsing context in which the links should open.',
                        validator: notEmpty(isString),
                    },
                },
                htmlAttributes: {
                    description: 'Attributes that should be added to the <html> tag.',
                    validator: required(isObject()),
                },
                meta: {
                    description: 'Meta tags to be used in <head>, should be formatted as objects.',
                    validator: required(isArray(isObject(isString))),
                },
                link: {
                    description: 'Link tags to be used in <head>, should be formatted as objects. ',
                    validator: required(isArray(isObject(isString))),
                },
                script: {
                    description: 'Script tags to be used in <head>, should be formatted as objects.',
                    validator: required(isArray(isObject(isString))),
                },
                style: {
                    description: 'Style tags to be used in <head>, should be formatted as objects.',
                    validator: required(isArray(isObject(isString))),
                },
                titleTemplate: {
                    description: 'Template to be used for <title>.',
                    validator: notEmpty(isString),
                },
            },
            stats: {
                description: 'Path to client stats file from build.',
                validator: required(notEmpty(isPath)),
            },
            applicationName: {
                description: 'Default application name to use for <title>.',
                validator: required(isString),
            },
            ssr: {
                description: 'If server side rendering should be enabled.',
                validator: required(isBoolean),
            },
            template: {
                path: {
                    description: 'A directory where the template for the application can be found. ' +
                        'Will default to internal path.',
                    validator: notEmpty(isPath),
                },
                name: {
                    description: 'Name of the template file that will be used. Uses Nunjucks, please see ' +
                        'documentation for more info.',
                    validator: required(notEmpty(isString)),
                },
            },
            debug: {
                client: {
                    description: 'Filter for debug messages that should be shown for the client, see ' +
                        'https://npmjs.com/package/debug.',
                    validator: isString,
                },
            },
            configWhitelistProperty: {
                description: 'A single property to expose to the client from node-config. Make sure that ' +
                    'this property does NOT contain any secrets that should not be exposed to the world.',
                validator: notEmpty(isString),
            },
            fetch: {
                server: {
                    description: 'What redial hooks that should run on the server and in what order.',
                    validator: required(isArray(isString)),
                },
                client: {
                    blocking: {
                        description: 'What redial hooks that should run on the client that blocks route transitions ' +
                            'and in what order.',
                        validator: required(isArray(isString)),
                    },
                    defer: {
                        description: 'What redial hooks that should run on the client that should not block route ' +
                            'transitions and in what order.',
                        validator: required(isArray(isString)),
                    },
                    parallel: {
                        description: 'If defer hooks should be started at the same time as the blocking ones.',
                        validator: required(isBoolean),
                    },
                },
            },
        },
    },
};
