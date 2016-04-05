import { isString, isBoolean, isPath, isArray, isObject, required } from 'roc/validators';

export default {
    settings: {
        groups: {
            runtime: {
                base: 'Base tag to be used in <head>, ' +
                    'see https://github.com/nfl/react-helmet.'
            }
        },
        descriptions: {
            runtime: {
                stats: 'Path to client stats file from build.',
                applicationName: 'Application name to use for <title>.',
                meta: 'Meta tags to be used in <head>, should be formatted as objects, ' +
                    'see https://github.com/nfl/react-helmet.',
                link: 'Link tags to be used in <head>, should be formatted as objects, ' +
                    'See https://github.com/nfl/react-helmet.',
                base: {
                    href: 'The document base address from which relative links are made.',
                    target: 'The browsing context in which the links should open.'
                },
                script: 'Script tags to be used in <head>, should be formatted as objects, ' +
                    'See https://github.com/nfl/react-helmet.',
                ssr: 'If server side rendering should be enabled.',
                clientBlocking: 'If "prefetch" should block a route transition on the client.',
                template: {
                    path: 'A directory where the template for the application can be found. Will default to internal ' +
                        'path.',
                    name: 'Name of the template file that will be used. Uses Nunjucks, please see documentation for ' +
                        'more info.'
                },
                debug: {
                    client: 'Filter for debug messages that should be shown for the client, see ' +
                        'https://npmjs.com/package/debug.'
                },
                configWhitelistProperty: 'A single property to expose to the client from node-config. Make sure that ' +
                    'this property does NOT contain any secrets that should not be exposed to the world.'
            }
        },

        validations: {
            runtime: {
                stats: isPath,
                applicationName: required(isString),
                meta: isArray(isObject(isString)),
                link: isArray(isObject(isString)),
                base: {
                    href: isString,
                    target: isString
                },
                script: isArray(isObject(isString)),
                ssr: isBoolean,
                clientBlocking: isBoolean,
                template: {
                    path: isPath,
                    name: isString
                },
                debug: {
                    client: isString
                },
                configWhitelistProperty: isString
            }
        }
    }
};
